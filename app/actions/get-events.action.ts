"use server"

import { environments } from "@/environments";
import { IEventsResponse } from "../interfaces";
import { TagsEnum } from "../enums/tags.enum";

export default async function getEvents(): Promise<IEventsResponse> {
    return await (await fetch(`${process.env.NEXT_PUBLIC_API_DEV_URL}/events`, { next: { tags: [TagsEnum.EVENT] } })).json()
}