import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { FeesSchema } from "@/interfaces/Fees/Fees";
import { mongoconnect } from "@/lib/mongodb";
import { Fees } from "@/models/FeesSchem";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { TokenServices } from "@/services/Token/token";
import { TokentInteface } from "@/interfaces/Token/tokenInterface";

export async function POST(
  req: NextRequest
): Promise<NextResponse<StanderedResponse>> {
  try {
    // Get token info first
    const token = new TokenServices();
    const tokenInfo = (await token.getTokenInfo()) as TokentInteface;

    // Check authentication
    if (!tokenInfo || !tokenInfo.schoolId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized!" },
        { status: 401 }
      );
    }

    // Parse request body
    const feesSchema: FeesSchema = await req.json();

    // Validate required fields
    if (!feesSchema || !feesSchema.class || !feesSchema.amount) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: class and amount are required.",
        },
        { status: 400 }
      );
    }

    // Validate class number
    if (feesSchema.class < 1 || feesSchema.class > 12) {
      return NextResponse.json(
        {
          success: false,
          error: "Class must be between 1 and 12.",
        },
        { status: 400 }
      );
    }

    // Validate amount
    if (feesSchema.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Amount must be a positive number.",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const isConnected = await mongoconnect();

    if (!isConnected) {
      return NextResponse.json(
        { success: false, error: "Internal server issue." },
        { status: 500 }
      );
    }

    // Convert schoolId to ObjectId if it's a string
    const schoolObjectId =
      typeof tokenInfo.schoolId === "string"
        ? new mongoose.Types.ObjectId(tokenInfo.schoolId)
        : tokenInfo.schoolId;

    // Check if fees already exist for this class and school
    const existingFees = await Fees.findOne({
      class: feesSchema.class,
      schoolId: schoolObjectId,
    });

    if (existingFees) {
      return NextResponse.json(
        {
          success: false,
          error: `Fees for class ${feesSchema.class} already exist.`,
        },
        { status: 409 }
      );
    }

    // Create new fees
    const newFees = new Fees({
      class: feesSchema.class,
      amount: feesSchema.amount,
      schoolId: schoolObjectId,
    });

    await newFees.save();

    return NextResponse.json(
      {
        success: true,
        message: `Fees for class ${feesSchema.class} created successfully.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating fees:", error);

    // // Handle duplicate key error (MongoDB error code 11000)
    // if (error instanceof MongoServerError && error.code === 11000) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "Fees for this class already exist.",
    //     },
    //     { status: 409 }
    //   );
    // }

    // Handle Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    // Handle cast errors (invalid ObjectId)
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid ID format.",
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON format in request body.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server issue." },
      { status: 500 }
    );
  }
}
