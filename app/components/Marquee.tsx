"use client"

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useScrollVelocityPlayback } from "../hooks/useScrollVelocityPlayback";

const Capoeirista3D = dynamic(() => import("./three/Capoeirista3D"), { ssr: false })

const PALAVRAS = ["Capoeira", "Música", "Tradição", "Luta", "Filosofia", "Arte", "Cultura", "Axé"]

export default function Marquee() {
    const items = [...PALAVRAS, ...PALAVRAS]
    const trackRef = useRef<HTMLDivElement>(null)
    useScrollVelocityPlayback(trackRef)

    return (
        <section aria-label="Capoeira, música e tradição" className="relative bg-[#070d24] text-white overflow-hidden">
            <div className="absolute inset-0 flex items-center opacity-90">
                <div ref={trackRef} className="marquee-track">
                    {[...items, ...items].map((palavra, index) =>
                        <span key={index} className={`px-6 text-5xl sm:text-7xl font-bold uppercase whitespace-nowrap ${index % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]" : "text-white/10"}`}>
                            {palavra} <span className="text-red-600/70">✦</span>
                        </span>
                    )}
                </div>
            </div>
            <div className="relative flex justify-center">
                <Capoeirista3D className="h-80 sm:h-[26rem] w-full max-w-xl" />
            </div>
        </section>
    )
}
