"use client"

import Image from "next/image";
import getEvents from "../actions/get-events.action";
import { resolveImagePath } from "../utils/resolve-image-path.util";
import { TypeImageEnum } from "../enums/type-image.enum";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events() {

    const [events, setEvents] = useState<string[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const { events } = await getEvents()
            setEvents(events)
        }
        fetchEvents()
    }, []);

    return (
        <section className="pt-20 bg-white flex justify-center flex-col" id="eventos">
            <h2 className="text-4xl lg:text-6xl text-center text-blue-950">Próximos Eventos</h2>

            <div className="flex my-10 justify-center gap-14 sm:flex-row flex-col sm:px-0 px-4">
                {events.map((event, index) =>
                    <Image key={index} className="w-auto" width={500} height={500} src={resolveImagePath(event, TypeImageEnum.EVENT)} unoptimized alt="Evento 1" />
                )}
            </div>

            <Link href="/eventos" className="self-center px-2 py-3 rounded border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all">Ver Todos os Eventos</Link>

        </section>
    )
}