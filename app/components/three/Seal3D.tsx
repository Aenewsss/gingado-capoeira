"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useInView } from "@/app/hooks/useInView";
import { useAdaptiveDpr } from "./AdaptiveQuality";

const SEAL_TEXTURE = "/selo-20-anos.webp"
const INTRO_DURATION = 1.8
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
/** Cresce passando um pouco do tamanho final e volta (efeito de "nascer"). */
const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2)
/** Espera depois do carregamento do site antes de a medalha nascer. */
const START_DELAY_MS = 250

function Coin({ start, onFirstFrame }: { start: boolean, onFirstFrame: () => void }) {
    const coinRef = useRef<THREE.Group>(null)
    const texture = useLoader(THREE.TextureLoader, SEAL_TEXTURE)
    const startedAt = useRef<number | null>(null)

    const materials = useMemo(() => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 8

        const edge = new THREE.MeshStandardMaterial({ color: "#d9b24c", metalness: 1, roughness: 0.22 })
        const face = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.35, roughness: 0.32 })
        return [edge, face, face]
    }, [texture])

    useFrame(({ clock, pointer }) => {
        const coin = coinRef.current
        if (!coin) return

        const elapsed = clock.getElapsedTime()
        if (!start) {
            coin.scale.setScalar(0)
            return
        }
        if (startedAt.current === null) {
            startedAt.current = elapsed
            onFirstFrame()
        }
        const introProgress = Math.min((elapsed - startedAt.current) / INTRO_DURATION, 1)
        const introSpin = (1 - easeOutCubic(introProgress)) * Math.PI * 4

        const scrollTilt = typeof window !== "undefined" ? Math.min(window.scrollY / window.innerHeight, 1) : 0
        const idleSwing = Math.sin(elapsed * 0.6) * 0.18

        // O ponteiro vem relativo ao canvas e passa de ±1 quando o mouse está no texto ao lado,
        // o que deixava a moeda de perfil (invisível). Limitado para inclinar no máximo ~20°.
        const pointerX = THREE.MathUtils.clamp(pointer.x, -1, 1)
        const pointerY = THREE.MathUtils.clamp(pointer.y, -1, 1)
        const targetY = idleSwing + pointerX * 0.35 + scrollTilt * Math.PI
        const targetX = -pointerY * 0.25 + Math.sin(elapsed * 0.8) * 0.04

        coin.rotation.y = introProgress < 1 ? targetY + introSpin : THREE.MathUtils.lerp(coin.rotation.y, targetY, 0.06)
        coin.rotation.x = THREE.MathUtils.lerp(coin.rotation.x, targetX, 0.06)
        coin.position.y = Math.sin(elapsed * 1.2) * 0.05
        coin.scale.setScalar(Math.max(easeOutBack(introProgress), 0))
    })

    return (
        <group ref={coinRef}>
            <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]} material={materials} castShadow>
                <cylinderGeometry args={[1.5, 1.5, 0.12, 128]} />
            </mesh>
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[1.5, 0.045, 24, 160]} />
                <meshStandardMaterial color="#f3cf63" metalness={1} roughness={0.15} />
            </mesh>
        </group>
    )
}

/** Diâmetro aparente da moeda na tela (cilindro de raio 1.5 visto a 6.2 de distância, fov 38). */
const COIN_SCREEN_RATIO = "70%"
const CONTEXT_RESTART_DELAY_MS = 300

export default function Seal3D() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const { dpr, monitor } = useAdaptiveDpr()
    const visible = useInView(wrapperRef, { once: false, rootMargin: "0px" })
    const [ready, setReady] = useState(false)
    const [lost, setLost] = useState(false)
    const [start, setStart] = useState(false)
    const [canvasKey, setCanvasKey] = useState(0)

    /**
     * A medalha nasce (de tamanho zero) só depois que o site terminou de carregar, e o próprio canvas 3D
     * só é criado nesse momento (em tempo ocioso), para não disputar a CPU com o primeiro carregamento.
     */
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        const whenIdle = (callback: () => void) => "requestIdleCallback" in window ? window.requestIdleCallback(callback, { timeout: 1500 }) : callback()
        const begin = () => { timer = setTimeout(() => whenIdle(() => setStart(true)), START_DELAY_MS) }
        if (document.readyState === "complete") begin()
        else window.addEventListener("load", begin, { once: true })
        return () => {
            clearTimeout(timer)
            window.removeEventListener("load", begin)
        }
    }, [])

    /** Se o navegador derrubar o contexto WebGL (acontece com várias cenas 3D na página), recria o canvas. */
    function watchContextLoss(canvas: HTMLCanvasElement) {
        canvas.addEventListener("webglcontextlost", event => {
            event.preventDefault()
            setReady(false)
            setLost(true)
            setTimeout(() => setCanvasKey(key => key + 1), CONTEXT_RESTART_DELAY_MS)
        }, { once: true })
    }

    return (
        <div ref={wrapperRef} className="relative w-full h-full">
            {/* Selo estático só se o navegador derrubar o 3D, enquanto ele é recriado. */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${lost && !ready ? "opacity-100" : "opacity-0"}`}>
                <Image sizes="400px" src="/selo-20-anos.webp" width={500} height={500} alt="Selo 20 anos Associação Cultural Gingado Capoeira" className="rounded-full aspect-square object-cover" style={{ height: COIN_SCREEN_RATIO, width: "auto" }} />
            </div>
            {start && <Canvas
                key={canvasKey}
                // "demand" ainda desenha o quadro inicial; "never" deixava o canvas em branco até a página detectar que ele está na tela.
                frameloop={visible ? "always" : "demand"}
                dpr={dpr}
                camera={{ position: [0, 0, 6.2], fov: 38 }}
                gl={{ antialias: true, alpha: true }}
                onCreated={({ gl }) => watchContextLoss(gl.domElement)}
            >
                {monitor}
                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 4, 5]} intensity={1.6} />
                <pointLight position={[-4, -2, 3]} intensity={18} color="#3b82f6" />
                <pointLight position={[4, -1, 2]} intensity={14} color="#ef4444" />
                <Coin start={start} onFirstFrame={() => setReady(true)} />
                <Environment resolution={256}>
                    <Lightformer intensity={2} position={[0, 5, -6]} scale={[10, 4, 1]} />
                    <Lightformer intensity={1.5} position={[-5, 0, 2]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
                    <Lightformer intensity={1.5} position={[5, 1, 2]} scale={[2, 8, 1]} rotation-y={-Math.PI / 2} />
                    <Lightformer intensity={0.8} color="#facc15" position={[0, -4, 3]} scale={[8, 2, 1]} rotation-x={-Math.PI / 2} />
                </Environment>
            </Canvas>}
        </div>
    )
}
