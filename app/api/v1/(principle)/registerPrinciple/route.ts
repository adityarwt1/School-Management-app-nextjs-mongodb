import {
  PrincipleRegisteredRequest,
  PrincipleRegisterResponse,
} from "@/interfaces/ApiResponse/Principle/registerInterface";
import { mongoconnect } from "@/lib/mongodb";
import Principle from "@/models/Principle";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { TokenInteface } from "@/interfaces/Token/tokenInterface";

export async function POST(
  req: NextRequest
): Promise<NextResponse<PrincipleRegisterResponse>> {
  try {
    const {
      bcCode,
      email,
      fullName,
      password,
      profilePicture,
    }: PrincipleRegisteredRequest = await req.json();

    if (!bcCode || !email || !fullName || !password || !profilePicture) {
      return NextResponse.json(
        {
          success: false,
          error: "Field not provided.",
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

    const existed = await Principle.findOne({ bcCode });
    if (existed) {
      return NextResponse.json(
        {
          success: false,
          error: `Principle already registered with BCCODE: ${bcCode}`,
          status: 409,
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const principle = await Principle.create({
      bcCode,
      email,
      fullName,
      password: hashedPassword,
      profilePicture,
    });

    if (!principle) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to register!",
          status: 500,
        },
        { status: 500 }
      );
    }

    const tokenPayload: TokenInteface = {
      _id: principle._id,
      role: "principle",
      schoolId: principle.schoolId,
      govt: principle.govt,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
      expiresIn: 30 * 24 * 60 * 60, // 30 days (seconds)
      issuer: "Aditya Rawat",
    });

    const cookieStore = await cookies();
    cookieStore.set("smaToken", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      name: "smaToken",
    });

    return NextResponse.json(
      {
        success: true,
        token,
        status: 200,
      },
      { status: 200 }
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
