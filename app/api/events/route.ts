import { NextResponse } from "next/server"
import fs from "fs"
import { PublicPathsEnum } from "@/app/enums/public-paths.enum"

export function GET() {
    const path = PublicPathsEnum.EVENTS

    const events = fs.readdirSync(path).reverse()

    if (!events.length) return NextResponse.json({ events, message: "Nenhum evento adicionado" })

    return NextResponse.json({ events, message: "" })
}

export async function POST(req: Request) {

    const form = await req.formData()

    const eventImage = form.get('event') as File

    const bufferImage = Buffer.from(await eventImage.arrayBuffer())

    const { length } = fs.readdirSync(PublicPathsEnum.EVENTS)
    const imageId = (length + 1) + "={id}"

    const path = PublicPathsEnum.EVENTS + imageId + eventImage.name

    const fileExists = fs.existsSync(path)

    if (fileExists) return NextResponse.json({ message: "Esse evento já foi adicionado" })

    fs.writeFileSync(path, bufferImage)

    return NextResponse.json({ message: "Evento adicionado com sucesso" })
}

export async function DELETE(req: Request) {

    const form = await req.formData()
    
    const event = form.get("event")

    const path = PublicPathsEnum.EVENTS + event

    fs.rmSync(path)

    return NextResponse.json({ message: "Evento removido com sucesso" })
}