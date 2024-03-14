import { NextResponse } from "next/server"
import fs from "fs"
import { PublicPathsEnum } from "@/app/enums/public-paths.enum"

export function GET() {
    const path = PublicPathsEnum.GALLERY

    const media = fs.readdirSync(path).reverse()

    if (!media.length) return NextResponse.json({ media, message: "Nenhuma mídia adicionada" })

    return NextResponse.json({ media, message: "" })
}

export async function POST(req: Request) {

    const form = await req.formData()

    const media = form.get('media') as File

    const bufferImage = Buffer.from(await media.arrayBuffer())

    const { length } = fs.readdirSync(PublicPathsEnum.GALLERY)
    const imageId = (length + 1) + "={id}"

    const path = PublicPathsEnum.GALLERY + imageId + media.name

    const fileExists = fs.existsSync(path)

    if (fileExists) return NextResponse.json({ message: "Essa mídia já foi adicionada" })

    fs.writeFileSync(path, bufferImage)

    return NextResponse.json({ message: "Mídia adicionada com sucesso" })
}

export async function DELETE(req: Request) {

    const form = await req.formData()
    
    const media = form.get("media")

    const path = PublicPathsEnum.GALLERY + media

    fs.rmSync(path)

    return NextResponse.json({ message: "Mídia removida com sucesso" })
}