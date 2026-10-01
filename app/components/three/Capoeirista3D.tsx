"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useInView } from "@/app/hooks/useInView";
import { MOVIMENTOS } from "@/app/data/movimentos";

/** Personagem (com textura) e o movimento "palhaço". */
const CHARACTER_URL = "/models/capoeirista.glb"
/** Arquivo de onde só a animação da ginga é aproveitada (outro boneco, mesmo esqueleto Mixamo). */
const GINGA_URL = "/models/ginga.glb"
/** Movimentos gravados em outros arquivos (mesmo esqueleto Mixamo); entram no rodízio depois do palhaço. */
const MOVE_URLS = MOVIMENTOS.map(nome => `/models/moves/${nome}.glb`)

const TARGET_HEIGHT = 1.75
/** O esqueleto acaba na base da cabeça; a altura real do corpo é um pouco maior. */
const HEAD_ALLOWANCE = 1.12
const CROSSFADE_SECONDS = 0.45
/** Quantas voltas de ginga antes de entrar um movimento. */
const GINGA_LOOPS_BETWEEN_MOVES = 1

/** O FBX do personagem trouxe parte dos ossos com sufixo ".001" (vira "001" no three.js). */
function findTargetBone(root: THREE.Object3D, sourceName: string) {
    return root.getObjectByName(sourceName) ?? root.getObjectByName(`${sourceName}001`)
}

/** Altura do quadril acima do osso mais baixo (pés), na pose de repouso. */
function hipsHeightAboveFeet(root: THREE.Object3D, hips: THREE.Object3D) {
    let lowest = Infinity
    root.traverse(object => {
        if ((object as THREE.Bone).isBone) lowest = Math.min(lowest, object.getWorldPosition(new THREE.Vector3()).y)
    })
    return hips.getWorldPosition(new THREE.Vector3()).y - lowest
}

/**
 * Converte o deslocamento do quadril de um esqueleto para o outro. Os dois arquivos guardam o quadril em
 * sistemas de coordenadas diferentes, então a conversão passa pelo mundo: vira deslocamento em relação à pose
 * de repouso, é reescalado pela altura do quadril e volta para o espaço do quadril do personagem.
 */
function convertHipsPositionTrack(track: THREE.KeyframeTrack, sourceHips: THREE.Object3D, targetHips: THREE.Object3D, ratio: number) {
    const sourceParent = sourceHips.parent!.matrixWorld
    const targetParentInverse = targetHips.parent!.matrixWorld.clone().invert()
    const sourceRest = sourceHips.getWorldPosition(new THREE.Vector3())
    const targetRest = targetHips.getWorldPosition(new THREE.Vector3())
    const point = new THREE.Vector3()

    const copy = track.clone()
    copy.name = `${targetHips.name}.position`
    for (let index = 0; index < copy.values.length; index += 3) {
        point.fromArray(copy.values, index).applyMatrix4(sourceParent)
        point.sub(sourceRest).multiplyScalar(ratio).add(targetRest).applyMatrix4(targetParentInverse)
        point.toArray(copy.values, index)
    }
    return copy
}

/**
 * Só a cabeça e o pescoço têm orientação de repouso diferente entre os dois arquivos: copiar a rotação direto
 * deixava a cabeça virada para baixo. Nos demais ossos a cópia direta é a que reproduz a ginga fielmente.
 */
const REST_RELATIVE_BONES = ["mixamorigNeck", "mixamorigHead"]

/** Aplica a rotação como diferença em relação à pose de repouso de cada esqueleto. */
function retargetRotationTrack(track: THREE.KeyframeTrack, sourceRest: THREE.Quaternion, target: THREE.Object3D) {
    const sourceRestInverse = sourceRest.clone().invert()
    const targetRest = target.quaternion.clone()
    const rotation = new THREE.Quaternion()

    const copy = track.clone()
    copy.name = `${target.name}.quaternion`
    for (let index = 0; index < copy.values.length; index += 4) {
        rotation.fromArray(copy.values, index)
        rotation.premultiply(sourceRestInverse).premultiply(targetRest)
        rotation.toArray(copy.values, index)
    }
    return copy
}

/**
 * Adapta um movimento gravado em outro boneco (ginga, armada) ao esqueleto do personagem: renomeia as trilhas de rotação para os
 * ossos dele e converte o deslocamento do quadril para o espaço e o tamanho deste corpo.
 */
function retargetClip(clip: THREE.AnimationClip, sourceRoot: THREE.Object3D, targetRoot: THREE.Object3D, name: string) {
    sourceRoot.updateMatrixWorld(true)
    targetRoot.updateMatrixWorld(true)
    const sourceHips = sourceRoot.getObjectByName("mixamorigHips")!
    const targetHips = targetRoot.getObjectByName("mixamorigHips")!
    const ratio = hipsHeightAboveFeet(targetRoot, targetHips) / hipsHeightAboveFeet(sourceRoot, sourceHips)

    const tracks = clip.tracks.flatMap(track => {
        const [boneName, property] = track.name.split(".")
        const target = findTargetBone(targetRoot, boneName)
        if (!target) return []

        if (property === "quaternion") {
            const source = sourceRoot.getObjectByName(boneName)
            if (source && REST_RELATIVE_BONES.includes(boneName)) return [retargetRotationTrack(track, source.quaternion, target)]
            const copy = track.clone()
            copy.name = `${target.name}.quaternion`
            return [copy]
        }
        if (property === "position" && boneName === "mixamorigHips") return [convertHipsPositionTrack(track, sourceHips, targetHips, ratio)]
        return []
    })

    return new THREE.AnimationClip(name, clip.duration, tracks)
}

function Capoeirista() {
    const groupRef = useRef<THREE.Group>(null)
    const rootLockRef = useRef<THREE.Group>(null)
    const character = useGLTF(CHARACTER_URL)
    const gingaSource = useGLTF(GINGA_URL)
    const moveSources = useGLTF(MOVE_URLS)

    const { mixer, ginga, moves } = useMemo(() => {
        const mixer = new THREE.AnimationMixer(character.scene)
        const ginga = mixer.clipAction(retargetClip(gingaSource.animations[0], gingaSource.scene, character.scene, "ginga"))
        const clips = [
            ...character.animations,
            ...moveSources.map((source, index) => retargetClip(source.animations[0], source.scene, character.scene, MOVIMENTOS[index])),
        ]
        const moves = clips.map(clip => {
            const action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopOnce, 1)
            action.clampWhenFinished = true
            return action
        })
        return { mixer, ginga, moves }
    }, [character, gingaSource, moveSources])

    /** Normaliza o tamanho pelo esqueleto em repouso e apoia os pés no chão (y = 0). */
    const { scale, offset } = useMemo(() => {
        character.scene.updateMatrixWorld(true)
        const bones = new THREE.Box3()
        character.scene.traverse(object => {
            if ((object as THREE.Bone).isBone) bones.expandByPoint(object.getWorldPosition(new THREE.Vector3()))
        })
        const height = (bones.max.y - bones.min.y) * HEAD_ALLOWANCE
        const scale = TARGET_HEIGHT / height
        const center = bones.getCenter(new THREE.Vector3())
        return { scale, offset: new THREE.Vector3(-center.x * scale, -bones.min.y * scale, -center.z * scale) }
    }, [character])

    useEffect(() => {
        character.scene.traverse(object => {
            const mesh = object as THREE.Mesh
            if (!mesh.isMesh) return
            mesh.castShadow = true
            // O bounding sphere das malhas com esqueleto não acompanha a animação; sem isso, peças somem da tela.
            mesh.frustumCulled = false
        })
    }, [character])

    /** Ginga em loop; a cada N voltas entra um movimento e, ao terminar, volta para a ginga. */
    useEffect(() => {
        let gingaLoops = 0
        let nextMove = 0

        ginga.reset().play()

        function onLoop(event: { action: THREE.AnimationAction }) {
            if (event.action !== ginga || moves.length === 0) return
            gingaLoops += 1
            if (gingaLoops < GINGA_LOOPS_BETWEEN_MOVES) return
            gingaLoops = 0
            const move = moves[nextMove++ % moves.length]
            move.reset().play()
            ginga.crossFadeTo(move, CROSSFADE_SECONDS, false)
        }

        function onFinished(event: { action: THREE.AnimationAction }) {
            if (!moves.includes(event.action)) return
            ginga.reset().play()
            event.action.crossFadeTo(ginga, CROSSFADE_SECONDS, false)
        }

        mixer.addEventListener("loop", onLoop)
        mixer.addEventListener("finished", onFinished)
        return () => {
            mixer.removeEventListener("loop", onLoop)
            mixer.removeEventListener("finished", onFinished)
            mixer.stopAllAction()
        }
    }, [mixer, ginga, moves])

    const hipsPosition = useMemo(() => new THREE.Vector3(), [])
    const bonePosition = useMemo(() => new THREE.Vector3(), [])
    const bones = useMemo(() => {
        const list: THREE.Bone[] = []
        character.scene.traverse(object => { if ((object as THREE.Bone).isBone) list.push(object as THREE.Bone) })
        return list
    }, [character])

    useFrame(({ clock, pointer }, delta) => {
        mixer.update(delta)
        const group = groupRef.current
        const rootLock = rootLockRef.current
        if (!group || !rootLock) return

        // Mantém o personagem no centro da faixa: os movimentos se deslocam pelo chão (o palhaço anda vários metros).
        group.updateMatrixWorld(true)
        const hips = character.scene.getObjectByName("mixamorigHips")
        if (hips) {
            group.worldToLocal(hips.getWorldPosition(hipsPosition))
            rootLock.position.x -= hipsPosition.x
            rootLock.position.z -= hipsPosition.z
        }

        // Mantém o contato com o chão: o ponto mais baixo do corpo (pé ou mão, no palhaço) fica em y = 0.
        // Cada arquivo grava a altura do quadril numa escala diferente (a armada vem ~1,7 acima); o ajuste é
        // exato a cada quadro, porque suavizado ele atrasava na troca de movimento e os pés afundavam no chão.
        let lowest = Infinity
        for (const bone of bones) lowest = Math.min(lowest, group.worldToLocal(bone.getWorldPosition(bonePosition)).y)
        if (Number.isFinite(lowest)) rootLock.position.y -= lowest

        const pointerX = THREE.MathUtils.clamp(pointer.x, -1, 1)
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, Math.sin(clock.getElapsedTime() * 0.25) * 0.35 + pointerX * 0.4, 0.05)
    })

    return (
        <group ref={groupRef}>
            <group ref={rootLockRef}>
                <primitive object={character.scene} scale={scale} position={offset} />
            </group>
        </group>
    )
}

export default function Capoeirista3D({ className = "" }: { className?: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const visible = useInView(wrapperRef, { once: false, rootMargin: "0px" })

    return (
        <div ref={wrapperRef} className={className}>
            <Canvas
                frameloop={visible ? "always" : "demand"}
                dpr={[1, 1.75]}
                camera={{ position: [0, 1.35, 5], fov: 35 }}
                gl={{ antialias: true, alpha: true }}
                onCreated={({ camera }) => camera.lookAt(0, 1.2, 0)}
            >
                <ambientLight intensity={1.1} />
                <directionalLight position={[0, 2, 5]} intensity={1.2} />
                <directionalLight position={[2, 4, 3]} intensity={2.6} />
                <pointLight position={[-2.5, 1.5, -1.5]} intensity={14} color="#60a5fa" />
                <pointLight position={[2.5, 1, -1.5]} intensity={10} color="#ef4444" />
                <Capoeirista />
                <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={5} blur={2.4} far={2.5} color="#000000" />
                <Environment resolution={128}>
                    <Lightformer intensity={1.2} position={[0, 4, 3]} scale={[6, 3, 1]} />
                </Environment>
            </Canvas>
        </div>
    )
}

useGLTF.preload(CHARACTER_URL)
useGLTF.preload(GINGA_URL)
useGLTF.preload(MOVE_URLS)
