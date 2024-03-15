"use server"

import { environments } from "@/environments";
import { TagsEnum } from "../enums/tags.enum";

export default async function getMedia(): Promise<any> {
    return await(await fetch(`${environments.API_URL}/gallery`, { next: { tags: [TagsEnum.GALLERY] } })).json()

}