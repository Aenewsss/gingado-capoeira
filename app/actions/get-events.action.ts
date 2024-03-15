"use server"

import { environments } from "@/environments";
import { IEventsResponse } from "../interfaces";
import { TagsEnum } from "../enums/tags.enum";

export default async function getEvents() {
    return await (await fetch(`${environments.API_URL}/events`, { next: { tags: [TagsEnum.EVENT] } })).json()
}