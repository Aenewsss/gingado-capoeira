"use server"

import { environments } from "@/environments";
import { TagsEnum } from "../enums/tags.enum";

export default async function getMedia(): Promise<any> {
    return await(await fetch(`http://localhost:3000/api/gallery`, { next: { tags: [TagsEnum.GALLERY] } })).json()
}