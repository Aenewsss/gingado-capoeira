"use client"

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CORES, GRADUACOES_ADULTO, GRADUACOES_INFANTIL, Graduacao } from "../data/graduacoes";

const Corda3D = dynamic(() => import("../components/three/Corda3D"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-blue-950/40">Carregando corda…</div>,
})

const SISTEMAS = {
    infantil: { titulo: "Infantil", graduacoes: GRADUACOES_INFANTIL },
    adulto: { titulo: "Adulto", graduacoes: GRADUACOES_ADULTO },
}

type Sistema = keyof typeof SISTEMAS

/** Ordem em que a rolagem da página percorre as cordas: primeiro todas as infantis, depois as adultas. */
const PASSOS = (Object.keys(SISTEMAS) as Sistema[]).flatMap(sistema =>
    SISTEMAS[sistema].graduacoes.map((_, index) => ({ sistema, index }))
)

/** Quanto a página rola (em vh) para avançar uma corda (apenas no Desktop). */
const VH_POR_CORDA = 16

/** Todas as cordas num varal só, na mesma ordem dos passos (infantil e depois adulto). */
const TODAS_AS_CORDAS = PASSOS.map(({ sistema, index }) => SISTEMAS[sistema].graduacoes[index])
const INICIO_ADULTO = PASSOS.findIndex(passo => passo.sistema === "adulto")

function passoDe(sistema: Sistema, index: number) {
    return PASSOS.findIndex(passo => passo.sistema === sistema && passo.index === index)
}

function swatchBackground(graduacao: Graduacao) {
    const [first, second] = graduacao.cordas.map(cor => CORES[cor])
    if (!second) return first
    return `linear-gradient(90deg, ${first} 50%, ${second} 50%)`
}

function Swatch({ graduacao }: { graduacao: Graduacao }) {
    return (
        <span className="relative inline-block w-12 h-3 rounded-full ring-1 ring-black/10 shrink-0" style={{ background: swatchBackground(graduacao) }}>
            {graduacao.ponteiras?.map((ponteira, index) => ponteira &&
                <span key={index} className="absolute top-0 h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: CORES[ponteira], right: index * 14 }} />
            )}
        </span>
    )
}

export default function Graduation() {
    const [passo, setPasso] = useState(0)
    const [isDesktop, setIsDesktop] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const listRef = useRef<HTMLOListElement>(null)

    // Refs para controle do gesto de swipe no mobile
    const touchStartX = useRef<number | null>(null)
    const touchStartY = useRef<number | null>(null)

    const { sistema, index: selected } = PASSOS[passo]
    const { graduacoes } = SISTEMAS[sistema]
    const current = graduacoes[selected]

    /** Identifica se está no desktop para habilitar a altura estendida do scroll */
    useEffect(() => {
        function checkDesktop() {
            setIsDesktop(window.innerWidth >= 1024)
        }
        checkDesktop()
        window.addEventListener("resize", checkDesktop)
        return () => window.removeEventListener("resize", checkDesktop)
    }, [])

    /** A rolagem da página só altera o passo no DESKTOP */
    useEffect(() => {
        function onScroll() {
            if (window.innerWidth < 1024) return // No mobile, o scroll da página é livre

            const section = sectionRef.current
            if (!section) return
            const rect = section.getBoundingClientRect()
            const scrollable = rect.height - window.innerHeight
            if (scrollable <= 0) return
            const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
            setPasso(Math.min(Math.floor(progress * PASSOS.length), PASSOS.length - 1))
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    /** Mantém a corda da vez visível na lista lateral (desktop). */
    useEffect(() => {
        const list = listRef.current
        const item = list?.querySelector<HTMLElement>(`[data-index="${selected}"]`)
        if (!list || !item) return
        list.scrollTo({ top: item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2, behavior: "smooth" })
    }, [selected, sistema])

    /** Trata o início do toque no mobile */
    function handleTouchStart(e: React.TouchEvent) {
        if (isDesktop) return
        touchStartX.current = e.touches[0].clientX
        touchStartY.current = e.touches[0].clientY
    }

    /** Trata o fim do toque no mobile e calcula o swipe horizontal no eixo X */
    function handleTouchEnd(e: React.TouchEvent) {
        if (isDesktop || touchStartX.current === null || touchStartY.current === null) return

        const deltaX = e.changedTouches[0].clientX - touchStartX.current
        const deltaY = e.changedTouches[0].clientY - touchStartY.current

        const SWIPE_THRESHOLD = 40 // Distância mínima em pixels para considerar o swipe

        // Só aciona se o movimento for predominantemente no eixo X (horizontal)
        if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                // Arrastou para a esquerda -> Próxima corda
                setPasso(p => Math.min(PASSOS.length - 1, p + 1))
            } else {
                // Arrastou para a direita -> Corda anterior
                setPasso(p => Math.max(0, p - 1))
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    }

    /** Ir para passo: no desktop rola a página; no mobile apenas troca a corda */
    function irParaPasso(passoAlvo: number) {
        if (window.innerWidth < 1024) {
            setPasso(passoAlvo)
            return
        }
        const section = sectionRef.current
        if (!section) return
        const scrollable = section.offsetHeight - window.innerHeight
        window.scrollTo({ top: section.offsetTop + ((passoAlvo + 0.5) / PASSOS.length) * scrollable })
    }

    function irPara(sistemaAlvo: Sistema, index: number) {
        irParaPasso(passoDe(sistemaAlvo, index))
    }

    return (
        <section
            ref={sectionRef}
            className="relative bg-white overflow-x-clip"
            id="sistema"
            style={isDesktop ? { height: `calc(100vh + ${PASSOS.length * VH_POR_CORDA}vh)` } : undefined}
        >
            <div className="lg:sticky lg:top-0 lg:h-screen h-auto flex flex-col justify-center pt-12 lg:pt-24 pb-6">
                <div className="px-4 text-center">
                    <p className="text-sm tracking-[0.3em] uppercase text-red-600">Cordas e ponteiras</p>
                    <h2 className="mt-1 text-3xl lg:text-5xl text-blue-950">Sistema de Graduação</h2>
                </div>

                <div className="mt-4 flex justify-center">
                    <div className="inline-flex p-1 rounded-full bg-blue-950/5 ring-1 ring-blue-950/10">
                        {(Object.keys(SISTEMAS) as Sistema[]).map(key =>
                            <button
                                key={key}
                                onClick={() => irPara(key, 0)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${sistema === key ? "bg-blue-950 text-white shadow-lg" : "text-blue-950 hover:bg-blue-950/10"}`}
                            >
                                {SISTEMAS[key].titulo}
                            </button>
                        )}
                    </div>
                </div>

                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5 grid lg:grid-cols-3 gap-8 items-center min-h-0">
                    <div className="lg:col-span-2 relative h-[min(500px,calc(100vh-17rem))] sm:h-[min(620px,calc(100vh-17rem))] rounded-3xl bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#e8ecf6_60%,#d7deef_100%)] ring-1 ring-blue-950/10 shadow-inner">
                        
                        {/* Area de toque no mobile com suporte a swipe horizontal */}
                        <div 
                            className="w-full h-full"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <Corda3D graduacoes={TODAS_AS_CORDAS} selected={passo} gapAt={INICIO_ADULTO} onSelect={irParaPasso} />
                        </div>

                        {/* Botões de navegação lateral adicionais para apoio no mobile */}
                        <button
                            onClick={() => setPasso(p => Math.max(0, p - 1))}
                            disabled={passo === 0}
                            aria-label="Corda anterior"
                            className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md text-blue-950 flex items-center justify-center font-bold text-lg disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                        >
                            ‹
                        </button>
                        <button
                            onClick={() => setPasso(p => Math.min(PASSOS.length - 1, p + 1))}
                            disabled={passo === PASSOS.length - 1}
                            aria-label="Próxima corda"
                            className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md text-blue-950 flex items-center justify-center font-bold text-lg disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                        >
                            ›
                        </button>

                        <div key={`${sistema}-${selected}`} className="word-reveal absolute left-4 top-4 text-left pointer-events-none px-4 py-2 rounded-2xl bg-white/90 backdrop-blur shadow-lg">
                            {current.categoria && <span className="!block text-xs tracking-[0.25em] uppercase text-red-600" style={{ animationDelay: "0ms" }}>{current.categoria}</span>}
                            <span className="!block text-2xl sm:text-3xl text-blue-950 font-semibold" style={{ animationDelay: "60ms" }}>{current.nome}</span>
                            {current.observacao && <span className="!block text-sm text-blue-950/60" style={{ animationDelay: "120ms" }}>{current.observacao}</span>}
                        </div>

                        <span className="pointer-events-none absolute left-5 bottom-4 rounded-full bg-white/85 px-3 py-1 text-xs text-blue-950/70 shadow">
                            <span className="hidden lg:inline">Role a página para trocar de corda</span>
                            <span className="lg:hidden">Deslize para os lados para trocar</span>
                        </span>
                        
                        <span className="absolute right-5 bottom-4 text-xs text-blue-950/50">{selected + 1} / {graduacoes.length}</span>
                        <div className="absolute left-0 right-0 -bottom-3 h-1 rounded-full bg-blue-950/10 overflow-hidden">
                            <div className="h-full bg-red-600 transition-[width] duration-300" style={{ width: `${((passo + 1) / PASSOS.length) * 100}%` }} />
                        </div>
                    </div>

                    <ol ref={listRef} className="hidden lg:grid relative bg-white grid-cols-1 gap-1 h-[min(620px,calc(100vh-17rem))] overflow-y-auto pr-2">
                        {graduacoes.map((graduacao, index) => {
                            const startsCategory = graduacao.categoria && graduacao.categoria !== graduacoes[index - 1]?.categoria
                            return (
                                <li key={graduacao.nome} data-index={index} className={startsCategory && index > 0 ? "mt-2" : ""}>
                                    {startsCategory && <span className="block px-3 pb-1 text-[11px] tracking-[0.25em] uppercase text-blue-950/50">{graduacao.categoria}</span>}
                                    <button
                                        onClick={() => irPara(sistema, index)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm transition-all ${index === selected ? "bg-blue-950 text-white shadow-md translate-x-1" : "text-blue-950 hover:bg-blue-950/5"}`}
                                    >
                                        <Swatch graduacao={graduacao} />
                                        <span>{graduacao.nome}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </section>
    )
}