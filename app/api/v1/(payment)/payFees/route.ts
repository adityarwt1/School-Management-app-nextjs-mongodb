import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TokenInteface} from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { TokenServices } from "@/services/Token/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<StanderedResponse>> {
  const tokenServices = new TokenServices();

  try {
    const tokenInfo = (await tokenServices.getTokenInfo()) as TokenInteface;

    if (!tokenInfo) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          status: 401,
        },
        { status: 401 }
      );
    }

    const body: PaymentAddress = await req.json();

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong",
          message: "Fields not provided properly!",
          status: 400,
        },
        { status: 400 }
      );
    }

    const isConnected = await mongoconnect();

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: "Internal server issue.",
          status: 500,
        },
        { status: 500 }
      );
    }

    const paymentFees = await Payment.create({
      ...body,
      schoolId: tokenInfo.schoolId,
      studentId: tokenInfo._id,
    });

    if (!paymentFees) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to pay!",
          message: "Failed while creating document.",
          status: 400,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment added successfully!",
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server issue.",
        status: 500,
      },
      { status: 500 }
    );
  }
}
