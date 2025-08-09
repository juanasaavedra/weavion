// src/HeroModel.jsx
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';

// Ruta absoluta segura para Vite y GitHub Pages
const MODEL_URL = new URL(
  'models/phone_with_leads_optimized.glb',
  import.meta.env.BASE_URL
).href;

// Precarga del modelo
useGLTF.preload(MODEL_URL);

function PhoneModel() {
  const { scene } = useGLTF(MODEL_URL);
  const ref = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer; // valores -1..1
    const targetRotX = y * 0.35;
    const targetRotY = x * 0.7;
    const targetPosY = -y * 0.2;

    if (!ref.current) return;
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * 0.12;
    ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * 0.12;
    ref.current.position.y += (targetPosY - ref.current.position.y) * 0.12;

    // Oscilación suave tipo “idle”
    ref.current.rotation.z +=
      (Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - ref.current.rotation.z) * 0.05;
  });

  return <primitive ref={ref} object={scene} scale={1.1} position={[0, 0, 0]} />;
}

export default function HeroModel() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 2.6], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -3, 2]} intensity={0.3} />
      <Suspense fallback={null}>
        <PhoneModel />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

loader.load(MODEL_URL, onLoad, undefined, (err) => {
  console.error('Fallo cargando modelo', err);
  // aquí puedes ocultar la escena o mostrar un placeholder
});
