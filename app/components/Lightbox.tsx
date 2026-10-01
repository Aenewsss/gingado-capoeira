"use client"

import Image from "next/image";
import { useEffect } from "react";

interface IProps {
    src: string | null
    alt: string
    /** view-transition-name compartilhado com a imagem de origem, para a animação de abrir/fechar. */
    transitionName?: string
    onClose: () => void
}

export default function Lightbox({ src, alt, transitionName, onClose }: IProps) {
    useEffect(() => {
        if (!src) return
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose()
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [src, onClose])

    if (!src) return null

    return (
        <div onClick={onClose} role="dialog" aria-modal="true" className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-[lightbox-in_0.3s_ease-out]">
            <Image loading="eager" sizes="92vw" quality={85} src={src} alt={alt} width={1287} height={1600} className="max-h-[92vh] w-auto rounded-lg shadow-2xl" style={{ viewTransitionName: transitionName }} />
            <button onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 text-white text-4xl leading-none">×</button>
        </div>
    )
}
