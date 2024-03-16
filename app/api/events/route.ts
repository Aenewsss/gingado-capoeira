import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { PublicPathsEnum } from "@/app/enums/public-paths.enum"

export function GET() {

    const folder = PublicPathsEnum.EVENTS

    const dir = path.resolve('./public', folder);

    const events = fs.readdirSync(dir).reverse()

    if (!events.length) return NextResponse.json({ events, message: "Nenhum evento adicionado" })

    return NextResponse.json({ events, message: "" })
}

export async function POST(req: Request) {

    const form = await req.formData()

    const eventImage = form.get('event') as File

    const bufferImage = Buffer.from(await eventImage.arrayBuffer())

    const { length } = fs.readdirSync(path.resolve('./public', PublicPathsEnum.EVENTS))
    const imageId = (length + 1) + "={id}"

    const folder = PublicPathsEnum.EVENTS + imageId + eventImage.name

    const dir = path.resolve('./public', folder);

    const fileExists = fs.existsSync(dir)

    if (fileExists) return NextResponse.json({ message: "Esse evento já foi adicionado" })

    fs.writeFileSync(dir, bufferImage)

    return NextResponse.json({ message: "Evento adicionado com sucesso" })
}

export async function DELETE(req: Request) {

    const form = await req.formData()

    const event = form.get("event")

    const folder = PublicPathsEnum.EVENTS + event
    const dir = path.resolve('./public', folder);

    fs.rmSync(dir)

    return NextResponse.json({ message: "Evento removido com sucesso" })
}