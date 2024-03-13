import { NextResponse } from "next/server"

export function GET() {

    const events = 0

    return NextResponse.json({events})
}

export async function POST(req: Request) {

    const body = await req.json()
    console.log(body)

    const newEvent = null
    
    return NextResponse.json({newEvent})
}