import Image from "next/image";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Reveal from "../components/Reveal";
import InstagramIcon from "../components/InstagramIcon";
import { CONTATO } from "../data/contato";

const INFOS = [
    { icone: MapPinIcon, rotulo: "Endereço", valor: CONTATO.endereco, href: CONTATO.mapaUrl },
    { icone: CalendarDaysIcon, rotulo: "Treinos", valor: CONTATO.treinos, href: CONTATO.instagramUrl },
    { icone: InstagramIcon, rotulo: "Instagram", valor: `@${CONTATO.instagram}`, href: CONTATO.instagramUrl },
]

export default function Headquarters() {
    return (
        <section className="py-24 bg-slate-50" id="sede">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8 items-stretch">
                <Reveal variant="fade-left" className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-xl shadow-blue-950/5 ring-1 ring-blue-950/5 flex flex-col">
                    <p className="text-sm tracking-[0.3em] uppercase text-red-600">Onde treinamos</p>
                    <h2 className="mt-2 text-4xl lg:text-5xl text-blue-950">Nossa sede</h2>

                    <div className="mt-6 flex items-center gap-4">
                        <Image src="/aruc-logo.png" width={64} height={64} alt="Logo ARUC" className="rounded-full ring-1 ring-blue-950/10" />
                        <p className="text-blue-950/70">{CONTATO.local}</p>
                    </div>

                    <ul className="mt-8 flex flex-col gap-5">
                        {INFOS.map(({ icone: Icone, rotulo, valor, href }) =>
                            <li key={rotulo}>
                                <Link href={href} target="_blank" className="group flex gap-4 items-start">
                                    <span className="shrink-0 w-11 h-11 rounded-xl bg-blue-950/5 text-blue-950 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                                        <Icone className="w-5 h-5" />
                                    </span>
                                    <span>
                                        <span className="block text-xs tracking-[0.2em] uppercase text-blue-950/50">{rotulo}</span>
                                        <span className="block text-blue-950 group-hover:text-red-600 transition-colors">{valor}</span>
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="mt-auto pt-8 flex flex-wrap gap-3">
                        <Link href={CONTATO.rotaUrl} target="_blank" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-950 text-white font-medium hover:-translate-y-0.5 transition-transform">
                            Como chegar <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </Link>
                        <Link href={CONTATO.instagramUrl} target="_blank" className="inline-flex items-center gap-2 px-5 py-3 rounded-full ring-1 ring-blue-950/20 text-blue-950 font-medium hover:bg-blue-950/5 transition-colors">
                            <InstagramIcon className="w-4 h-4" /> Instagram
                        </Link>
                    </div>
                </Reveal>

                <Reveal variant="fade-right" delay={150} className="lg:col-span-3 relative min-h-[380px] rounded-3xl overflow-hidden shadow-xl shadow-blue-950/10 ring-1 ring-blue-950/5">
                    <iframe
                        title="Mapa da sede da Gingado Capoeira (ARUC, Cruzeiro Velho)"
                        className="absolute inset-0 w-full h-full grayscale-[30%] contrast-[1.05]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={CONTATO.mapaEmbedUrl}
                    />
                    <span className="pointer-events-none absolute left-4 bottom-4 rounded-full bg-white/95 backdrop-blur px-4 py-2 text-sm text-blue-950 shadow-lg">
                        🥋 {CONTATO.treinos}
                    </span>
                </Reveal>
            </div>
        </section>
    )
}
