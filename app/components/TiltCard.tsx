"use client"

import { MouseEvent, ReactNode, useRef } from "react";

interface IProps {
    children: ReactNode
    className?: string
    onClick?: () => void
}

const MAX_TILT_DEG = 8

export default function TiltCard({ children, className = "", onClick }: IProps) {
    const ref = useRef<HTMLButtonElement>(null)

    function handleMove(event: MouseEvent<HTMLButtonElement>) {
        const card = ref.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(900px) rotateY(${x * MAX_TILT_DEG * 2}deg) rotateX(${-y * MAX_TILT_DEG * 2}deg) scale(1.02)`
    }

    function handleLeave() {
        if (ref.current) ref.current.style.transform = ""
    }

    return (
        <button ref={ref} type="button" onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`tilt-card block ${className}`}>
            {children}
        </button>
    )
}
