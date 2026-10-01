"use client"

import { MouseEvent, ReactNode, useRef } from "react";

const STRENGTH = 0.3

/**
 * Efeito magnético leve: o conteúdo é puxado na direção do cursor enquanto ele está por cima.
 * Só age com mouse (no toque não existe hover) e respeita prefers-reduced-motion via CSS global.
 * É uma <div> de propósito: `.word-reveal span` anima spans e a animação sobrescreveria o transform.
 */
export default function Magnetic({ children, className = "" }: { children: ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null)

    function onMove(event: MouseEvent<HTMLDivElement>) {
        const element = ref.current
        if (!element) return
        const rect = element.getBoundingClientRect()
        const x = (event.clientX - rect.left - rect.width / 2) * STRENGTH
        const y = (event.clientY - rect.top - rect.height / 2) * STRENGTH
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    function onLeave() {
        if (ref.current) ref.current.style.transform = ""
    }

    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block transition-transform duration-300 ease-out ${className}`}>
            {children}
        </div>
    )
}
