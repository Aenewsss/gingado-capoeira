"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { ALBUNS } from "../data/playlists";

/** Fila única: as faixas dos dois álbuns em sequência. */
const FILA = ALBUNS.flatMap(album => album.faixas.map(faixa => ({ ...faixa, album: album.titulo })))

const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2 }

interface YTPlayer {
    loadVideoById(videoId: string): void
    cueVideoById(videoId: string): void
    playVideo(): void
    pauseVideo(): void
    mute(): void
    unMute(): void
    destroy(): void
}

declare global {
    interface Window {
        YT?: { Player: new (element: HTMLElement, options: object) => YTPlayer }
        onYouTubeIframeAPIReady?: () => void
    }
}

/** Carrega a IFrame API do YouTube uma vez só. */
function loadYouTubeApi() {
    return new Promise<void>(resolve => {
        if (window.YT?.Player) return resolve()
        const previous = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = () => { previous?.(); resolve() }
        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const script = document.createElement("script")
            script.src = "https://www.youtube.com/iframe_api"
            document.head.appendChild(script)
        }
    })
}

function Icon({ path, className = "w-5 h-5" }: { path: string, className?: string }) {
    return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d={path} /></svg>
}

const ICONES = {
    play: "M8 5v14l11-7z",
    pause: "M6 5h4v14H6zm8 0h4v14h-4z",
    next: "M6 18l8.5-6L6 6v12zm8.5-6v6h2V6h-2z",
    prev: "M6 6h2v12H6zm3.5 6 8.5 6V6z",
    volume: "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z",
    muted: "M16.5 12A4.5 4.5 0 0 0 14 8v2.2l2.4 2.4c.1-.2.1-.4.1-.6zM19 12c0 .9-.2 1.8-.5 2.6l1.5 1.5A9 9 0 0 0 14 3.2v2.1a7 7 0 0 1 5 6.7zM4.3 3 3 4.3 7.7 9H3v6h4l5 5v-6.7l4.3 4.3a7 7 0 0 1-2.3 1.2v2.1a9 9 0 0 0 3.7-1.8l2 2L21 19.7l-9-9L4.3 3zM12 4 9.9 6.1 12 8.2V4z",
}

export default function MusicPlayer() {
    const [aberto, setAberto] = useState(false)
    const [atual, setAtual] = useState(0)
    const [tocando, setTocando] = useState(false)
    const [mudo, setMudo] = useState(false)
    const [albumAberto, setAlbumAberto] = useState(ALBUNS[0].id)
    const playerRef = useRef<YTPlayer | null>(null)
    const playerHostRef = useRef<HTMLDivElement>(null)
    const atualRef = useRef(atual)
    atualRef.current = atual

    const tocar = useCallback((indice: number) => {
        const proximo = (indice + FILA.length) % FILA.length
        setAtual(proximo)
        playerRef.current?.loadVideoById(FILA[proximo].videoId)
    }, [])

    /** O player só é criado quando a pessoa abre o painel, para não pesar o carregamento do site. */
    useEffect(() => {
        if (!aberto || playerRef.current || !playerHostRef.current) return
        let cancelado = false
        loadYouTubeApi().then(() => {
            if (cancelado || !playerHostRef.current || !window.YT) return
            playerRef.current = new window.YT.Player(playerHostRef.current, {
                height: "100%",
                width: "100%",
                videoId: FILA[atualRef.current].videoId,
                playerVars: { playsinline: 1, controls: 0, rel: 0, modestbranding: 1 },
                events: {
                    onStateChange: ({ data }: { data: number }) => {
                        if (data === YT_STATE.PLAYING) setTocando(true)
                        if (data === YT_STATE.PAUSED) setTocando(false)
                        if (data === YT_STATE.ENDED) tocar(atualRef.current + 1)
                    },
                },
            })
        })
        return () => { cancelado = true }
    }, [aberto, tocar])

    useEffect(() => () => playerRef.current?.destroy(), [])

    function alternarPlay() {
        if (!playerRef.current) return setAberto(true)
        if (tocando) playerRef.current.pauseVideo()
        else playerRef.current.playVideo()
    }

    function alternarMudo() {
        if (mudo) playerRef.current?.unMute()
        else playerRef.current?.mute()
        setMudo(!mudo)
    }

    const faixa = FILA[atual]

    return (
        <div
            className="fixed bottom-5 right-5 z-[55] flex flex-col items-end gap-3"
            onMouseEnter={() => setAberto(true)}
        >
            <div
                className={`w-80 max-w-[calc(100vw-2.5rem)] origin-bottom-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden transition-all duration-300 ${aberto ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none h-0"}`}
                onMouseLeave={() => setAberto(false)}
            >
                <div className="aspect-video bg-black">
                    <div ref={playerHostRef} />
                </div>

                <div className="px-4 pt-3">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-red-600">{faixa.album}</p>
                    <p className="font-semibold text-blue-950 truncate">{faixa.titulo}</p>
                </div>

                <div className="flex items-center justify-center gap-3 py-2 text-blue-950">
                    <button onClick={() => tocar(atual - 1)} aria-label="Faixa anterior" className="p-2 rounded-full hover:bg-blue-950/5"><Icon path={ICONES.prev} /></button>
                    <button onClick={alternarPlay} aria-label={tocando ? "Pausar" : "Tocar"} className="p-3 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-md"><Icon path={tocando ? ICONES.pause : ICONES.play} className="w-6 h-6" /></button>
                    <button onClick={() => tocar(atual + 1)} aria-label="Próxima faixa" className="p-2 rounded-full hover:bg-blue-950/5"><Icon path={ICONES.next} /></button>
                    <button onClick={alternarMudo} aria-label={mudo ? "Ativar som" : "Silenciar"} className="p-2 rounded-full hover:bg-blue-950/5"><Icon path={mudo ? ICONES.muted : ICONES.volume} /></button>
                </div>

                <div className="flex border-t border-black/5 text-xs">
                    {ALBUNS.map(album =>
                        <button
                            key={album.id}
                            onClick={() => setAlbumAberto(album.id)}
                            className={`flex-1 py-2 font-medium transition-colors ${albumAberto === album.id ? "text-blue-950 border-b-2 border-red-600" : "text-blue-950/50 hover:text-blue-950"}`}
                        >
                            {album.titulo}
                        </button>
                    )}
                </div>

                <ol className="max-h-56 overflow-y-auto py-1">
                    {FILA.map((item, indice) => item.album === ALBUNS.find(album => album.id === albumAberto)?.titulo &&
                        <li key={item.videoId}>
                            <button
                                onClick={() => tocar(indice)}
                                className={`w-full flex items-center gap-3 px-4 py-1.5 text-left text-sm transition-colors ${indice === atual ? "bg-red-50 text-red-700 font-medium" : "text-blue-950 hover:bg-blue-950/5"}`}
                            >
                                <span className="w-5 text-xs text-blue-950/40 tabular-nums">{indice === atual && tocando ? "♪" : ALBUNS.find(album => album.titulo === item.album)!.faixas.findIndex(f => f.videoId === item.videoId) + 1}</span>
                                <span className="truncate">{item.titulo}</span>
                            </button>
                        </li>
                    )}
                </ol>
            </div>

            <button
                // No mouse o hover já abriu; o clique só alterna no toque (celular), onde não existe hover.
                onClick={event => setAberto((event.nativeEvent as PointerEvent).pointerType === "mouse" ? true : !aberto)}
                aria-label="Músicas do Gingado Capoeira"
                className="relative w-14 h-14 rounded-full bg-[#ff0000] text-white shadow-xl shadow-red-900/30 flex items-center justify-center hover:scale-105 transition-transform"
            >
                {tocando && <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />}
                <svg viewBox="0 0 24 24" className="relative w-8 h-8" aria-hidden="true">
                    <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M10 8.8v6.4l5.2-3.2z" fill="currentColor" />
                </svg>
            </button>
        </div>
    )
}
