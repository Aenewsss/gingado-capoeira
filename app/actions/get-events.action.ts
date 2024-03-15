"use server"

import { environments } from "@/environments";
import { IEventsResponse } from "../interfaces";
import { TagsEnum } from "../enums/tags.enum";

export default async function getEvents(): Promise<IEventsResponse> {
    return await (await fetch(`http://localhost:3000/api/events`, { next: { tags: [TagsEnum.EVENT] } })).json()
}