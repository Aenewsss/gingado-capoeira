"use server"

import { environments } from "@/environments"
import { revalidateTag } from "next/cache"
import { TagsEnum } from "../enums/tags.enum"

export async function addMedia(prevState: any, form: FormData) {

    const { message } = await (await fetch(`http://localhost:3000/api/gallery`,
        {
            method: 'POST',
            body: form
        }
    )).json()

    revalidateTag(TagsEnum.GALLERY)

    return { message }
}