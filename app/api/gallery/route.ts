import { NextResponse } from "next/server"
import fs from "fs"
import { PublicPathsEnum } from "@/app/enums/public-paths.enum"
import path from "path";

export function GET() {
    const folder = PublicPathsEnum.GALLERY

    const dir = path.resolve('./public', folder);

    const media = fs.readdirSync(dir).filter(el => el != "home").reverse()

    if (!media.length) return NextResponse.json({ media, message: "Nenhuma mídia adicionada" })

    return NextResponse.json({ media, message: "" })
}

export async function POST(req: Request) {

    const form = await req.formData()

    const media = form.get('media') as File

    const bufferImage = Buffer.from(await media.arrayBuffer())

    const length = fs.readdirSync(path.resolve('./public', PublicPathsEnum.GALLERY)).length - 1
    const imageId = (length + 1) + "={id}"

    const folder = PublicPathsEnum.GALLERY + imageId + media.name

    const dir = path.resolve('./public', folder);

    const fileExists = fs.existsSync(dir)

    if (fileExists) return NextResponse.json({ message: "Essa mídia já foi adicionada" })

    const newImagePath = `public/${folder}`
    
    fs.writeFile(newImagePath, bufferImage, (err) => { if (err) console.error(err) })

    return NextResponse.json({ message: "Mídia adicionada com sucesso" })
}

export async function DELETE(req: Request) {

    const form = await req.formData()

    const media = form.get("media")

    const folder = PublicPathsEnum.GALLERY + media

    const dir = path.resolve('./public', folder);

    fs.rmSync(dir)

    return NextResponse.json({ message: "Mídia removida com sucesso" })
}