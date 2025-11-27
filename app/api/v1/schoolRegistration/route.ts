import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    try {
        // const {full}
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal server issue."},{status:500})
    }
    
}