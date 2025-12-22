import { StatusCode, StatusText } from "@/interfaces/ApiResponse/standeredResponse";
import { PaymentHistoryInterface } from "@/interfaces/PayMent/Payment";
import { TokenInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { TokenServices } from "@/services/Token/token";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest): Promise<NextResponse<PaymentHistoryInterface>> {
  const tokenServices = new TokenServices();
  const searchParams =  req.nextUrl.searchParams;
  const skip = Number(searchParams.get("skip"))|| 0;
  const limit = Number(searchParams.get("limit")) || 12
  try {
    const tokenInfo = (await tokenServices.getTokenInfo()) as TokenInteface;

    if (
      !tokenInfo ||
      !tokenInfo._id ||
      !tokenInfo.schoolId ||
      tokenInfo.role !== "student"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized!",
          status: 401,
        },
        { status: 401 }
      );
    }

    const isConnected = await mongoconnect();

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: "Internal server issue.",
          message: "Failed to connect database",
          status: 500,
        },
        { status: 500 }
      );
    }

    const result = await Payment.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(tokenInfo.schoolId),
          studentId: new mongoose.Types.ObjectId(tokenInfo._id),
        },
      },

      {
        $facet: {
          data: [
            { $sort: { month: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                month: 1,
                amount: 1,
                remains: 1,
                createdAt: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        paymentHistory:result[0].data,
        totalCount:result[0]["totalCount"][0].count,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: StatusText.INTERNAL_SERVER_ERROR,
        message: (error as Error).message,
        status: StatusCode.INTERNAL_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
