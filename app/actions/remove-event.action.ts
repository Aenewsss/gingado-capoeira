"use server"

import { environments } from "@/environments"
import { revalidateTag } from "next/cache"
import { TagsEnum } from "../enums/tags.enum"

export default async function removeEvent(prevState: any, form: FormData) {
    const { message } = await (await fetch(`http://localhost:3000/api/events`,
        {
            method: 'DELETE',
            body: form
        }
    )).json()

    revalidateTag(TagsEnum.EVENT)
    
    return { message }
}