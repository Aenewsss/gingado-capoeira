"use client"

import { RefObject, useEffect } from "react";

/**
 * Desloca o elemento no eixo Y proporcionalmente à distância dele até o centro da tela.
 * `speed` positivo faz o elemento andar mais devagar que a página (fica "para trás"); negativo, mais rápido.
 * Escreve só `transform` (sem re-render do React) e respeita prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(ref: RefObject<T>, speed: number, options: { minWidth?: number } = {}) {
    const { minWidth = 0 } = options

    useEffect(() => {
        const element = ref.current
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        let frame = 0
        function update() {
            frame = 0
            if (!element) return
            if (window.innerWidth < minWidth) {
                element.style.transform = ""
                return
            }
            const rect = element.getBoundingClientRect()
            const distance = rect.top + rect.height / 2 - window.innerHeight / 2
            element.style.transform = `translate3d(0, ${(distance * speed).toFixed(1)}px, 0)`
        }
        function schedule() {
            if (!frame) frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", schedule, { passive: true })
        window.addEventListener("resize", schedule)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("scroll", schedule)
            window.removeEventListener("resize", schedule)
        }
    }, [ref, speed, minWidth])
}
