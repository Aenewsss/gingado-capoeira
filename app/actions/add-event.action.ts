"use server"

import { environments } from "@/environments"
import { revalidateTag } from "next/cache"
import { TagsEnum } from "../enums/tags.enum"

export async function addEvent(prevState: any, form: FormData) {

    const { message } = await (await fetch(`${environments.API_URL}/events`,
        {
            method: 'POST',
            body: form
        }
    )).json()

    revalidateTag(TagsEnum.EVENT)

    return { message }
}