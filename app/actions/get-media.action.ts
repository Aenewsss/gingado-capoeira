"use server"

import { TagsEnum } from "../enums/tags.enum";

export default async function getMedia(): Promise<any> {
    return await(await fetch(`${process.env.NEXT_PUBLIC_API_DEV_URL}/gallery`, { next: { tags: [TagsEnum.GALLERY] } })).json()
}