import { environments } from "@/environments";
import { TagsEnum } from "../enums/tags.enum";

/**
 * No navegador a rota é relativa: o site sempre consulta a própria API, em qualquer porta ou domínio.
 * A URL absoluta do .env só é usada quando a chamada roda no servidor.
 */
function eventsUrl() {
    return typeof window === "undefined" ? `${environments.API_URL}/events` : "/api/events"
}

export default async function getEvents() {
    return await (await fetch(eventsUrl(), { next: { tags: [TagsEnum.EVENT] } })).json()
}
