"use client"

import { RefObject, useEffect, useState } from "react";

export function useInView<T extends Element>(ref: RefObject<T>, options: { once?: boolean, rootMargin?: string } = {}) {
    const { once = true, rootMargin = "0px 0px -10% 0px" } = options
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting)
            if (entry.isIntersecting && once) observer.disconnect()
        }, { rootMargin })

        observer.observe(element)
        return () => observer.disconnect()
    }, [ref, once, rootMargin])

    return inView
}
