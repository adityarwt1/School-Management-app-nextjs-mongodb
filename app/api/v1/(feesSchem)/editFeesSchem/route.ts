import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { mongoconnect } from "@/lib/mongodb";
import { Fees } from "@/models/FeesSchem";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { UpdateFeesBody } from "@/interfaces/Fees/Fees";


export async function PUT(
  req: NextRequest
): Promise<NextResponse<StanderedResponse>> {
  try {
    const body: UpdateFeesBody = await req.json();

    // Validate _id
    if (!body._id) {
      return NextResponse.json(
        {
          success: false,
          error: "_id is required.",
        },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(body._id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid _id format.",
        },
        { status: 400 }
      );
    }

    // Check if at least one field to update is provided
    if (!body.class && !body.amount) {
      return NextResponse.json(
        {
          success: false,
          error:
            "At least one field (class or amount) must be provided to update.",
        },
        { status: 400 }
      );
    }

    // Validate class number if provided
    if (body.class !== undefined && (body.class < 1 || body.class > 12)) {
      return NextResponse.json(
        {
          success: false,
          error: "Class must be between 1 and 12.",
        },
        { status: 400 }
      );
    }

    // Validate amount if provided
    if (body.amount !== undefined && body.amount < 0) {
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

    // Build update object
    const updateData: {
        class?:number,
        amount?:number
    } = {};
    if (body.class !== undefined) updateData.class = body.class;
    if (body.amount !== undefined) updateData.amount = body.amount;

    // Check if fees with new class already exists (if class is being updated)
    if (body.class !== undefined) {
      const existingFees = await Fees.findById(body._id);

      if (!existingFees) {
        return NextResponse.json(
          {
            success: false,
            error: "Fees record not found.",
          },
          { status: 404 }
        );
      }

      // Check if another record exists with the same class and schoolId
      const duplicateFees = await Fees.findOne({
        class: body.class,
        schoolId: existingFees.schoolId,
        _id: { $ne: body._id },
      });

      if (duplicateFees) {
        return NextResponse.json(
          {
            success: false,
            error: `Fees for class ${body.class} already exist.`,
          },
          { status: 409 }
        );
      }
    }

    // Update fees
    const updatedFees = await Fees.findByIdAndUpdate(
      body._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedFees) {
      return NextResponse.json(
        {
          success: false,
          error: "Fees record not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Fees updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating fees:", error);

    // Handle duplicate key error
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

    return NextResponse.json(
      { success: false, error: "Internal server issue." },
      { status: 500 }
    );
  }
}
