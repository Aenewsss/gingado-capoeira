"use client"

import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CORES, Graduacao } from "@/app/data/graduacoes";
import { useInView } from "@/app/hooks/useInView";

const ROPE_RADIUS = 0.055
const ROPE_LENGTH = 2.5
const CORD_SPACING = 0.42
/** Espaço extra no varal entre as cordas infantis e as adultas. */
const GROUP_GAP = 0.35
const STRAND_GAP = 0.065
const WEAVE_REPEAT_PER_UNIT = 14
const TASSEL_STRANDS = 150
const TASSEL_LENGTH = 0.42

/** Câmera em diagonal ao varal, como na foto das cordas penduradas na mesa. */
const CAMERA_OFFSET = new THREE.Vector3(-1.45, 1.25, 3.7)
const FOCUS_HEIGHT = -1.5

function shade(hex: string, amount: number) {
    return "#" + new THREE.Color(hex).offsetHSL(0, 0, amount).getHexString()
}

/** Relevo sutil de algodão trançado, em tons de cinza: dá textura sem pintar faixas na corda. */
function createWeaveBumpTexture() {
    const size = 64
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")!
    context.fillStyle = "#808080"
    context.fillRect(0, 0, size, size)

    const rows = 8
    const step = size / rows
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < rows; column++) {
            const x = column * step
            const y = row * step
            const gradient = context.createLinearGradient(x, y, x + step, y + step)
            gradient.addColorStop(0, "#5a5a5a")
            gradient.addColorStop(0.5, "#a8a8a8")
            gradient.addColorStop(1, "#5a5a5a")
            context.fillStyle = gradient
            context.beginPath()
            const direction = row % 2 ? 1 : -1
            context.moveTo(x, y + step / 2)
            context.lineTo(x + step / 2, y + step / 2 + direction * step / 2)
            context.lineTo(x + step, y + step / 2)
            context.lineTo(x + step / 2, y + step / 2 - direction * step / 2)
            context.closePath()
            context.fill()
        }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
}

/** PRNG determinístico, para franjas e caimento ficarem sempre iguais entre renders. */
function mulberry32(seed: number) {
    return () => {
        seed |= 0
        seed = (seed + 0x6d2b79f5) | 0
        let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296
    }
}

function Rope({ curve, color, bumpTexture }: { curve: THREE.Curve<THREE.Vector3>, color: string, bumpTexture: THREE.Texture }) {
    const geometry = useMemo(() => new THREE.TubeGeometry(curve, 72, ROPE_RADIUS, 12, false), [curve])

    const material = useMemo(() => {
        const bumpMap = bumpTexture.clone()
        bumpMap.repeat.set(curve.getLength() * WEAVE_REPEAT_PER_UNIT, 2)
        bumpMap.needsUpdate = true
        return new THREE.MeshStandardMaterial({ color, bumpMap, bumpScale: 1.2, roughness: 0.92, metalness: 0 })
    }, [bumpTexture, curve, color])

    useEffect(() => () => { geometry.dispose(); material.bumpMap?.dispose(); material.dispose() }, [geometry, material])

    return <mesh geometry={geometry} material={material} />
}

/** Franja da ponta: muitos fios finos de algodão, como a ponteira de verdade. */
function Tassel({ position, color, seed }: { position: THREE.Vector3, color: string, seed: number }) {
    const strandsRef = useRef<THREE.InstancedMesh>(null)

    useEffect(() => {
        const strands = strandsRef.current
        if (!strands) return

        const matrix = new THREE.Matrix4()
        const rotation = new THREE.Quaternion()
        const tint = new THREE.Color()
        const random = mulberry32(seed)

        for (let index = 0; index < TASSEL_STRANDS; index++) {
            const angle = random() * Math.PI * 2
            const startRadius = Math.sqrt(random()) * ROPE_RADIUS * 1.3
            const spread = 0.03 + random() * 0.2
            const length = TASSEL_LENGTH * (0.75 + random() * 0.35)

            rotation.setFromEuler(new THREE.Euler(Math.sin(angle) * spread, 0, -Math.cos(angle) * spread))
            const direction = new THREE.Vector3(0, -1, 0).applyQuaternion(rotation)
            const center = new THREE.Vector3(Math.cos(angle) * startRadius, -0.05, Math.sin(angle) * startRadius).addScaledVector(direction, length / 2)

            matrix.compose(center, rotation, new THREE.Vector3(1, length, 1))
            strands.setMatrixAt(index, matrix)
            strands.setColorAt(index, tint.set(color).offsetHSL(0, 0, (random() - 0.5) * 0.08))
        }

        strands.instanceMatrix.needsUpdate = true
        if (strands.instanceColor) strands.instanceColor.needsUpdate = true
        ;(strands.material as THREE.Material).needsUpdate = true
    }, [color, seed])

    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[ROPE_RADIUS * 1.4, 16, 12]} />
                <meshStandardMaterial color={color} roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[ROPE_RADIUS * 1.25, ROPE_RADIUS * 1.2, 0.07, 16]} />
                <meshStandardMaterial color={shade(color, -0.04)} roughness={0.9} />
            </mesh>
            <instancedMesh ref={strandsRef} args={[undefined, undefined, TASSEL_STRANDS]}>
                <cylinderGeometry args={[0.007, 0.005, 1, 4]} />
                <meshStandardMaterial roughness={1} />
            </instancedMesh>
        </group>
    )
}

/** Uma das duas metades da corda: passa por cima do varal e cai na frente. */
function createStrandCurve(xOffset: number, seed: number) {
    const random = mulberry32(seed)
    const drift = (random() - 0.5) * 0.08
    const length = ROPE_LENGTH * (0.92 + random() * 0.1)

    return new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset, -0.25, -0.2),
        new THREE.Vector3(xOffset, 0.02, -0.14),
        new THREE.Vector3(xOffset, ROPE_RADIUS + 0.01, 0),
        new THREE.Vector3(xOffset, 0.02, 0.15),
        new THREE.Vector3(xOffset + drift * 0.3, -0.25, 0.2),
        new THREE.Vector3(xOffset + drift * 0.7, -length * 0.5, 0.21),
        new THREE.Vector3(xOffset + drift, -length, 0.2),
    ])
}

/** A selecionada mantém a cor original e as demais escurecem para ela se destacar. */
const BRIGHTNESS = { selected: 1, hovered: 0.8, idle: 0.22 }

interface CordProps {
    graduacao: Graduacao
    index: number
    x: number
    selected: boolean
    hovered: boolean
    bumpTexture: THREE.Texture
    onSelect: (index: number) => void
    onHover: (index: number | null, event?: ThreeEvent<PointerEvent>) => void
}

/** Corda dobrada ao meio no varal. Bicolor: cada metade (cada ponta) é de uma cor. */
function HangingCord({ graduacao, index, x, selected, hovered, bumpTexture, onSelect, onHover }: CordProps) {
    const groupRef = useRef<THREE.Group>(null)
    const brightness = useRef(BRIGHTNESS.idle)

    const [leftColor, rightColor] = [CORES[graduacao.cordas[0]], CORES[graduacao.cordas[graduacao.cordas.length - 1]]]
    const [leftPonteira, rightPonteira] = graduacao.ponteiras ?? [null, null]

    const leftCurve = useMemo(() => createStrandCurve(-STRAND_GAP, index * 2 + 1), [index])
    const rightCurve = useMemo(() => createStrandCurve(STRAND_GAP, index * 2 + 2), [index])

    useFrame(({ clock }, delta) => {
        const group = groupRef.current
        if (!group) return
        const elapsed = clock.getElapsedTime()
        group.position.z = THREE.MathUtils.damp(group.position.z, selected ? 0.38 : hovered ? 0.1 : 0, 5, delta)
        group.rotation.x = Math.sin(elapsed * 1.1 + index * 0.7) * (selected ? 0.035 : 0.012)

        const target = selected ? BRIGHTNESS.selected : hovered ? BRIGHTNESS.hovered : BRIGHTNESS.idle
        brightness.current = THREE.MathUtils.damp(brightness.current, target, 6, delta)

        group.traverse(object => {
            const material = (object as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined
            if (!material?.color) return
            material.userData.baseColor ??= material.color.clone()
            material.color.copy(material.userData.baseColor).multiplyScalar(brightness.current)
        })
    })

    function handleClick(event: ThreeEvent<MouseEvent>) {
        event.stopPropagation()
        onSelect(index)
    }

    return (
        <group
            ref={groupRef}
            position-x={x}
            onClick={handleClick}
            onPointerMove={event => { event.stopPropagation(); onHover(index, event) }}
            onPointerOut={() => onHover(null)}
        >
            <Rope curve={leftCurve} color={leftColor} bumpTexture={bumpTexture} />
            <Rope curve={rightCurve} color={rightColor} bumpTexture={bumpTexture} />
            <Tassel position={leftCurve.getPoint(1)} color={leftPonteira ? CORES[leftPonteira] : leftColor} seed={index * 2 + 11} />
            <Tassel position={rightCurve.getPoint(1)} color={rightPonteira ? CORES[rightPonteira] : rightColor} seed={index * 2 + 12} />
        </group>
    )
}

const FLY_SETTLE_DISTANCE = 0.02

/**
 * Leva a câmera até a corda selecionada. O OrbitControls deixa a pessoa arrastar, girar e dar zoom;
 * enquanto ela interage o voo é interrompido, e volta a acontecer na próxima seleção.
 */
function CameraRig({ focusX }: { focusX: number }) {
    const { camera, size } = useThree()
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const flying = useRef(true)
    const desiredPosition = useMemo(() => new THREE.Vector3(), [])
    const desiredTarget = useMemo(() => new THREE.Vector3(), [])

    useEffect(() => { flying.current = true }, [focusX])

    /**
     * A rolagem da página troca as cordas, então a rodinha só dá zoom com Ctrl/⌘ (a pinça do trackpad também
     * chega com ctrlKey). No celular, um dedo rola a página e dois dedos dão zoom.
     */
    useEffect(() => {
        const controls = controlsRef.current
        const wrapper = controls?.domElement?.parentElement
        if (!controls || !wrapper) return
        ;(controls.domElement as HTMLElement).style.touchAction = "pan-y"

        const decideZoom = (event: WheelEvent) => { controls.enableZoom = event.ctrlKey || event.metaKey }
        const allowPinch = (event: PointerEvent) => { if (event.pointerType === "touch") controls.enableZoom = true }

        wrapper.addEventListener("wheel", decideZoom, { capture: true, passive: true })
        wrapper.addEventListener("pointerdown", allowPinch, { capture: true })
        return () => {
            wrapper.removeEventListener("wheel", decideZoom, { capture: true })
            wrapper.removeEventListener("pointerdown", allowPinch, { capture: true })
        }
    }, [])

    useFrame((_, delta) => {
        const controls = controlsRef.current
        if (!controls || !flying.current) return

        const distance = Math.max(1.15, 1.35 / (size.width / size.height))
        desiredTarget.set(focusX, FOCUS_HEIGHT, 0)
        desiredPosition.copy(desiredTarget).addScaledVector(CAMERA_OFFSET, distance)

        const step = 1 - Math.exp(-3 * delta)
        camera.position.lerp(desiredPosition, step)
        controls.target.lerp(desiredTarget, step)
        controls.update()

        if (camera.position.distanceTo(desiredPosition) < FLY_SETTLE_DISTANCE) flying.current = false
    })

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
            minDistance={1.4}
            maxDistance={9}
            minPolarAngle={Math.PI * 0.3}
            maxPolarAngle={Math.PI * 0.62}
            minAzimuthAngle={-Math.PI * 0.32}
            maxAzimuthAngle={Math.PI * 0.2}
            screenSpacePanning
            enableZoom={false}
            touches={{ ONE: undefined as unknown as THREE.TOUCH, TWO: THREE.TOUCH.DOLLY_PAN }}
            onStart={() => { flying.current = false }}
        />
    )
}

interface RackProps extends IProps {
    hovered: number | null
    onHover: CordProps["onHover"]
}

function CordRack({ graduacoes, selected, hovered, gapAt, onSelect, onHover }: RackProps) {
    const bumpTexture = useMemo(() => createWeaveBumpTexture(), [])
    useEffect(() => () => bumpTexture.dispose(), [bumpTexture])

    const cordX = (index: number) => index * CORD_SPACING + (gapAt !== undefined && index >= gapAt ? GROUP_GAP : 0)
    const rackLength = cordX(graduacoes.length - 1)

    return (
        <>
            <CameraRig focusX={cordX(selected)} />

            <mesh position={[rackLength / 2, -0.06, 0]}>
                <boxGeometry args={[rackLength + 8, 0.12, 0.3]} />
                <meshStandardMaterial color="#5b3b22" roughness={0.6} />
            </mesh>
            <mesh position={[rackLength / 2, -2.4, -0.16]}>
                <planeGeometry args={[rackLength + 8, 4.7]} />
                <meshStandardMaterial color="#0f1d4a" roughness={0.8} />
            </mesh>

            {graduacoes.map((graduacao, index) =>
                <HangingCord
                    key={index}
                    graduacao={graduacao}
                    index={index}
                    x={cordX(index)}
                    selected={index === selected}
                    hovered={index === hovered}
                    bumpTexture={bumpTexture}
                    onSelect={onSelect}
                    onHover={onHover}
                />
            )}
        </>
    )
}

interface IProps {
    graduacoes: Graduacao[]
    selected: number
    /** Índice onde começa o segundo grupo (adulto); ganha um espaço a mais no varal. */
    gapAt?: number
    onSelect: (index: number) => void
}

interface Tooltip {
    index: number
    x: number
    y: number
}

export default function Corda3D({ graduacoes, selected, gapAt, onSelect }: IProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const visible = useInView(wrapperRef, { once: false, rootMargin: "0px" })
    const [tooltip, setTooltip] = useState<Tooltip | null>(null)

    function handleHover(index: number | null, event?: ThreeEvent<PointerEvent>) {
        const wrapper = wrapperRef.current
        if (index === null || !event || !wrapper) return setTooltip(null)
        const rect = wrapper.getBoundingClientRect()
        setTooltip({ index, x: event.nativeEvent.clientX - rect.left, y: event.nativeEvent.clientY - rect.top })
    }

    const hoveredCord = tooltip ? graduacoes[tooltip.index] : null

    return (
        <div ref={wrapperRef} className="relative w-full h-full" style={{ cursor: tooltip ? "pointer" : "default" }}>
            <Canvas
                frameloop={visible ? "always" : "demand"}
                dpr={[1, 1.75]}
                camera={{ position: [-3, 1, 6], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
                onPointerMissed={() => setTooltip(null)}
            >
                <ambientLight intensity={0.75} />
                <directionalLight position={[-2, 4, 5]} intensity={2.2} />
                <directionalLight position={[4, 1, 2]} intensity={0.6} color="#93c5fd" />
                <CordRack graduacoes={graduacoes} selected={selected} gapAt={gapAt} hovered={tooltip?.index ?? null} onSelect={onSelect} onHover={handleHover} />
                <Environment resolution={128}>
                    <Lightformer intensity={1.2} position={[0, 4, 4]} scale={[8, 3, 1]} />
                    <Lightformer intensity={0.6} position={[-5, 0, 0]} scale={[2, 6, 1]} rotation-y={Math.PI / 2} />
                </Environment>
            </Canvas>

            {tooltip && hoveredCord &&
                <div
                    role="tooltip"
                    className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full -mt-3 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm text-blue-950 shadow-xl ring-1 ring-black/5"
                    style={{ left: tooltip.x, top: tooltip.y - 12 }}
                >
                    {hoveredCord.categoria && <span className="block text-[10px] tracking-[0.2em] uppercase text-red-600">{hoveredCord.categoria}</span>}
                    <span className="font-semibold">{hoveredCord.nome}</span>
                </div>
            }
        </div>
    )
}
