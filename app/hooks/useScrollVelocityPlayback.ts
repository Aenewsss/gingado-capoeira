"use client"

import { RefObject, useEffect } from "react";

const MAX_BOOST = 4
const VELOCITY_TO_BOOST = 2.5
const DECAY_PER_FRAME = 0.92

/**
 * Acelera a animação CSS do elemento conforme a velocidade da rolagem e volta ao ritmo normal aos poucos
 * (marquee "reativo", comum em sites premiados). Respeita prefers-reduced-motion.
 */
export function useScrollVelocityPlayback<T extends HTMLElement>(ref: RefObject<T>) {
    useEffect(() => {
        const element = ref.current
        if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        let lastY = window.scrollY
        let lastTime = performance.now()
        let boost = 0
        let frame = 0

        function onScroll() {
            const now = performance.now()
            const velocity = Math.abs(window.scrollY - lastY) / Math.max(now - lastTime, 1)
            lastY = window.scrollY
            lastTime = now
            boost = Math.min(Math.max(boost, velocity * VELOCITY_TO_BOOST), MAX_BOOST)
            if (!frame) frame = requestAnimationFrame(tick)
        }

        function tick() {
            boost *= DECAY_PER_FRAME
            if (boost < 0.01) boost = 0
            for (const animation of element!.getAnimations()) animation.playbackRate = 1 + boost
            frame = boost > 0 ? requestAnimationFrame(tick) : 0
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            cancelAnimationFrame(frame)
        }
    }, [ref])
}
