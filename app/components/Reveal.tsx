"use client"

import { ElementType, ReactNode, useRef } from "react";
import { useInView } from "../hooks/useInView";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "clip"

interface IProps {
    children: ReactNode
    variant?: RevealVariant
    delay?: number
    className?: string
    as?: ElementType
}

export default function Reveal({ children, variant = "fade-up", delay = 0, className = "", as: Tag = "div" }: IProps) {
    const ref = useRef<HTMLDivElement>(null)
    const visible = useInView(ref)

    return (
        <Tag
            ref={ref}
            className={`reveal ${className}`}
            data-variant={variant}
            data-visible={visible}
            style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
        >
            {children}
        </Tag>
    )
}
