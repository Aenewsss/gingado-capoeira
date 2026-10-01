"use client"

import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import CountUp from "../components/CountUp";
import WordReveal from "../components/WordReveal";

const Seal3D = dynamic(() => import("../components/three/Seal3D"), {
    ssr: false,
    loading: () => <SealPlaceholder />,
})

/** Mesmo tamanho do selo estático dentro do Seal3D, para não "pular" quando o 3D assume. */
function SealPlaceholder() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Image priority unoptimized src="/selo-20-anos.jpg" width={500} height={500} alt="Selo 20 anos Associação Cultural Gingado Capoeira" className="rounded-full aspect-square object-cover" style={{ height: "70%", width: "auto" }} />
        </div>
    )
}

interface IProps {
    onlyShowNavbar?: boolean
}

export default function Top(props: IProps) {
    if (props.onlyShowNavbar) return <Navbar />

    return (
        <section className="relative min-h-[100svh] overflow-hidden bg-black text-white">
            <Navbar overlay />

            <div className="absolute inset-0">
                <Image priority unoptimized className="hero-bg w-full h-full object-cover" width={1280} height={853} src="/foto-topo.png" alt="Foto topo, Roda de capoeira" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-36 pb-16 grid lg:grid-cols-2 gap-6 items-center min-h-[100svh]">
                <div className="order-2 lg:order-1 text-center lg:text-left">
                    <p className="word-reveal text-xs sm:text-sm tracking-[0.35em] uppercase text-amber-200/90">
                        <span style={{ animationDelay: "200ms" }}>Mestre Pablo · in memoriam</span>
                    </p>

                    <h1 className="mt-4 font-bold leading-none">
                        <span className="block text-7xl sm:text-8xl lg:text-9xl text-shimmer">
                            <CountUp from={2006} to={2026} />
                        </span>
                    </h1>

                    <p className="mt-8 text-xl sm:text-2xl font-light italic text-white/85 max-w-xl mx-auto lg:mx-0">
                        <WordReveal text="“O orgulho divide os homens, a humildade os une”" initialDelay={600} step={70} />
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start word-reveal">
                        <a href="#eventos" style={{ animationDelay: "1300ms" }} className="group px-6 py-3 rounded-full border border-white/70 hover:bg-white hover:text-black font-medium transition-all hover:-translate-y-0.5">
                            Próximos eventos <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>

                <div className="order-1 lg:order-2 h-[260px] sm:h-[340px] lg:h-[440px]">
                    <Seal3D />
                </div>
            </div>

            <a href="#sobre" aria-label="Rolar para baixo" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-cue">
                <span className="block w-6 h-10 rounded-full border-2 border-white/60 relative">
                    <span className="absolute left-1/2 top-2 -translate-x-1/2 w-1 h-2 rounded-full bg-white/80" />
                </span>
            </a>
        </section>
    )
}
