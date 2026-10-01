"use client"

import Image from "next/image";
import getEvents from "../actions/get-events.action";
import { resolveImagePath } from "../utils/resolve-image-path.util";
import { TypeImageEnum } from "../enums/type-image.enum";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import Lightbox from "../components/Lightbox";

export default function Events() {

    const [events, setEvents] = useState<string[]>([]);
    const [openedEvent, setOpenedEvent] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            const { events } = await getEvents()
            setEvents(events)
        }
        fetchEvents()
    }, []);

    const [featuredEvent, ...otherEvents] = events

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-100 flex justify-center flex-col" id="eventos">
            <Reveal className="px-4 text-center">
                <p className="text-sm tracking-[0.3em] uppercase text-red-600">Agenda</p>
                <h2 className="mt-2 text-4xl lg:text-6xl text-blue-950">Próximos Eventos</h2>
            </Reveal>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-12 flex flex-col gap-10">
                {featuredEvent &&
                    <Reveal variant="scale" className="flex justify-center">
                        <TiltCard onClick={() => setOpenedEvent(featuredEvent)} className="w-full max-w-xl rounded-xl overflow-hidden shadow-2xl shadow-blue-950/30 ring-4 ring-amber-400/70">
                            <Image className="w-full h-auto" width={1287} height={1600} src={resolveImagePath(featuredEvent, TypeImageEnum.EVENT)} unoptimized alt="Evento em destaque" />
                        </TiltCard>
                    </Reveal>
                }

                <div className="flex flex-wrap justify-center gap-8">
                    {otherEvents.map((event, index) =>
                        <Reveal key={event} delay={(index % 3) * 120} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
                            <TiltCard onClick={() => setOpenedEvent(event)} className="w-full rounded-xl overflow-hidden shadow-xl shadow-blue-950/20 hover:shadow-2xl">
                                <Image className="w-full h-auto" width={1287} height={1600} src={resolveImagePath(event, TypeImageEnum.EVENT)} unoptimized alt={`Evento ${index + 2}`} />
                            </TiltCard>
                        </Reveal>
                    )}
                </div>
            </div>

            <Link href="/eventos" className="self-center px-6 py-3 rounded-full border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all hover:-translate-y-0.5">Ver Todos os Eventos</Link>

            <Lightbox src={openedEvent && resolveImagePath(openedEvent, TypeImageEnum.EVENT)} alt="Cartaz do evento" onClose={() => setOpenedEvent(null)} />
        </section>
    )
}
