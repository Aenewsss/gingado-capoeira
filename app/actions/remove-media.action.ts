"use server"

import { environments } from "@/environments"
import { revalidateTag } from "next/cache"
import { TagsEnum } from "../enums/tags.enum"

export default async function removeMedia(prevState: any, form: FormData) {
    const { message } = await (await fetch(`http://localhost:3000/api/gallery`,
        {
            method: 'DELETE',
            body: form
        }
    )).json()

    revalidateTag(TagsEnum.GALLERY)
    
    return { message }
}