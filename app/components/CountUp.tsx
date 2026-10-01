"use client"

import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

interface IProps {
    from: number
    to: number
    duration?: number
    className?: string
}

export default function CountUp({ from, to, duration = 2200, className }: IProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const visible = useInView(ref)
    const [value, setValue] = useState(from)

    useEffect(() => {
        if (!visible) return
        let frame = 0
        const start = performance.now()

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setValue(Math.round(from + (to - from) * eased))
            if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [visible, from, to, duration])

    return <span ref={ref} className={className}>{value}</span>
}
