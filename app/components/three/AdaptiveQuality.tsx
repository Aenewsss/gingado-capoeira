"use client"

import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

const DPR_MOBILE = 1.5
const DPR_DESKTOP = 1.75

/**
 * Resolução adaptativa para as cenas 3D: começa com a máxima do aparelho (menor no celular) e cai para 1
 * se o FPS não aguentar. Uso: `const { dpr, monitor } = useAdaptiveDpr()`, `dpr` no Canvas e `monitor` dentro dele.
 */
export function useAdaptiveDpr() {
    const maxDpr = typeof window !== "undefined" && window.innerWidth < 768 ? DPR_MOBILE : DPR_DESKTOP
    const [dpr, setDpr] = useState(maxDpr)

    const monitor = (
        <PerformanceMonitor
            flipflops={3}
            onDecline={() => setDpr(1)}
            onIncline={() => setDpr(maxDpr)}
            onFallback={() => setDpr(1)}
        />
    )

    return { dpr, monitor }
}
