"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, BanknotesIcon, ClipboardDocumentCheckIcon, DocumentTextIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import Lightbox from "../components/Lightbox";

const DOCUMENTO = "/modelo-transparencia-ativa.png"

/** O que o quadro de transparência publica de cada parceria (MROSC). */
const ITENS = [
    { icone: DocumentTextIcon, titulo: "Termo e processo", texto: "Número do termo de fomento, data da assinatura e processo SEI." },
    { icone: BanknotesIcon, titulo: "Valor e equipe", texto: "Valor global da parceria e recursos destinados à equipe de trabalho." },
    { icone: ClipboardDocumentCheckIcon, titulo: "Execução e contas", texto: "Período de execução e prazo de prestação de contas." },
]

export default function ModeloTA() {
    const [aberto, setAberto] = useState(false)

    return (
        <section className="relative py-24 bg-[#070d24] text-white overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-700/20 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
                <div>
                    <Reveal variant="mask">
                        <p className="text-sm tracking-[0.3em] uppercase text-amber-300">Prestação de contas</p>
                        <h2 className="mt-2 text-4xl lg:text-6xl">Transparência Ativa</h2>
                    </Reveal>
                    <Reveal delay={120}>
                        <p className="mt-6 text-lg font-light text-white/75 leading-8 max-w-xl">
                            As parcerias com o poder público ficam abertas para consulta, como prevê o Marco Regulatório das Organizações da Sociedade Civil (MROSC).
                        </p>
                    </Reveal>

                    <ul className="mt-10 grid sm:grid-cols-3 gap-4">
                        {ITENS.map(({ icone: Icone, titulo, texto }, index) =>
                            <Reveal as="li" key={titulo} delay={200 + index * 120} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 transition-colors">
                                <Icone className="w-7 h-7 text-amber-300" />
                                <p className="mt-3 font-semibold">{titulo}</p>
                                <p className="mt-1 text-sm text-white/60 leading-6">{texto}</p>
                            </Reveal>
                        )}
                    </ul>

                    <Reveal delay={500} className="mt-10 flex flex-wrap gap-4">
                        <Link href="/transparencia" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#070d24] font-medium hover:-translate-y-0.5 transition-transform">
                            Ver página de transparência <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <button onClick={() => setAberto(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full ring-1 ring-white/40 hover:bg-white/10 transition-colors">
                            <MagnifyingGlassPlusIcon className="w-5 h-5" /> Ampliar documento
                        </button>
                    </Reveal>
                </div>

                <Reveal variant="scale" delay={150} className="flex justify-center lg:justify-end">
                    <TiltCard onClick={() => setAberto(true)} className="group relative w-full max-w-md rounded-2xl bg-white p-3 shadow-2xl shadow-black/50 rotate-2 hover:rotate-0">
                        <Image className="w-full h-auto rounded-lg" width={1064} height={1446} sizes="(min-width: 1024px) 448px, 90vw" alt="Modelo de transparência ativa da parceria" src={DOCUMENTO} />
                        <span className="absolute bottom-6 right-6 inline-flex items-center gap-1 rounded-full bg-[#070d24]/85 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <MagnifyingGlassPlusIcon className="w-4 h-4" /> Clique para ampliar
                        </span>
                    </TiltCard>
                </Reveal>
            </div>

            <Lightbox src={aberto ? DOCUMENTO : null} alt="Modelo de transparência ativa" onClose={() => setAberto(false)} />
        </section>
    )
}
