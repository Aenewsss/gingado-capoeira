"use client"

import Lenis from "lenis";
import { useEffect } from "react";

/** Distância a compensar da navbar fixa ao navegar por âncoras (#sobre, #eventos...). */
const NAVBAR_OFFSET = -88

/**
 * Rolagem suave (Lenis) só na home. Não trava nada: apenas suaviza a rodinha/trackpad.
 * Fica desligada para quem pede menos movimento (prefers-reduced-motion).
 */
export default function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const lenis = new Lenis({ duration: 1.1, anchors: { offset: NAVBAR_OFFSET } })
        let frame = 0
        const raf = (time: number) => {
            lenis.raf(time)
            frame = requestAnimationFrame(raf)
        }
        frame = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(frame)
            lenis.destroy()
        }
    }, [])

    return null
}
