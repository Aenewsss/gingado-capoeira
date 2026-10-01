"use client"

import { ReactNode, useRef } from "react";
import { useParallax } from "../hooks/useParallax";

interface IProps {
    children: ReactNode
    speed: number
    /** Abaixo dessa largura de tela o parallax fica desligado (útil no mobile). */
    minWidth?: number
    className?: string
}

/** Envolve o conteúdo num elemento próprio para o parallax não brigar com o transform do <Reveal>. */
export default function Parallax({ children, speed, minWidth, className = "" }: IProps) {
    const ref = useRef<HTMLDivElement>(null)
    useParallax(ref, speed, { minWidth })
    return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}
