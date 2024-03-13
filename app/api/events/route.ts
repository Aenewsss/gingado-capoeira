import { NextResponse } from "next/server"

export function GET() {

    const events = 0

    return NextResponse.json({events})
}

export function POST(req: Request) {

    
    const newEvent = null
    
    return NextResponse.json({newEvent})
}