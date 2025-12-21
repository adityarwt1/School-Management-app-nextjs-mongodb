import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        (await cookies()).delete("smaToken")

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." }, { status: 500 })
    }
}