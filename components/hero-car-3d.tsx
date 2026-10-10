"use client"

import { Suspense, useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei"
import * as THREE from "three"

export const CAR_MODEL_URL = "/models/audi.glb"

// Longest side of the car in scene units, and a yaw offset in case the
// generated model is not facing +X.
const CAR_LENGTH = 4.6
const MODEL_YAW_OFFSET = 0

const BRAND_ORANGE = "#f64b00"

// ─── Car model ────────────────────────────────────────────────────────────────

function Car({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF(CAR_MODEL_URL)
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  // Normalise size and sit the car on y = 0, centred on the origin
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = CAR_LENGTH / Math.max(size.x, size.z)
    return { scale: s, offset: new THREE.Vector3(-center.x, -box.min.y, -center.z) }
  }, [scene])

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) obj.castShadow = true
    })
  }, [scene])

  useLayoutEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const scrollTurn = Math.min(window.scrollY / window.innerHeight, 1) * Math.PI * 0.6
    const idle = reducedMotion ? 0 : state.clock.elapsedTime * 0.12
    const targetYaw = -0.6 + idle + scrollTurn + pointer.current.x * 0.25
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetYaw, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.04, 3, delta)
  })

  return (
    <group ref={group}>
      <group rotation-y={MODEL_YAW_OFFSET} scale={scale}>
        <primitive object={scene} position={offset} />
      </group>
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────

export default function HeroCar3D({
  reducedMotion = false,
  onReady,
}: {
  reducedMotion?: boolean
  onReady?: () => void
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.3, 10], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
      }}
    >
      <ambientLight intensity={0.25} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.4}
        penumbra={1}
        intensity={60}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Brand-coloured rim light from behind */}
      <pointLight position={[-4, 1.2, -3]} intensity={30} color={BRAND_ORANGE} distance={12} />

      <Suspense fallback={null}>
        <group position={[0, -0.9, 0]}>
          <Car reducedMotion={reducedMotion} />
          <ContactShadows position={[0, 0.005, 0]} opacity={0.75} scale={12} blur={2.4} far={3} />
        </group>
        {/* Studio reflections built from local light panels — no HDR download */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 1.5, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.2} position={[-6, 1, 0]} scale={[1, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer intensity={1.2} position={[6, 1, 0]} scale={[1, 6, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer intensity={3} color={BRAND_ORANGE} position={[0, 0.5, -8]} scale={[12, 1, 1]} />
        </Environment>
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

// Fires once the model has loaded (rendered inside Suspense)
function ReadySignal({ onReady }: { onReady?: () => void }) {
  useLayoutEffect(() => {
    onReady?.()
  }, [onReady])
  return null
}
