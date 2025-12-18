import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // start here
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." }, { status: 500 })
    }
}