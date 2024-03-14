"use server"

import { environments } from "@/environments";
import { IMediaResponse } from "../interfaces";
import { TagsEnum } from "../enums/tags.enum";

export default async function getEvents(): Promise<IMediaResponse> {
    return await (await fetch(`${environments.API_URL}/gallery`, { next: { tags: [TagsEnum.GALLERY] } })).json()
}