// src/HeroModel.jsx
import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

// Modelo que reacciona al movimiento del mouse
function PhoneModel() {
  const { scene } = useGLTF('/models/phone_with_leads_optimized.glb');
  const ref = useRef();

  useFrame((state, delta) => {
    const { x, y } = state.pointer; // -1..1
    const targetRotX = y * 0.35;    // inclinación arriba/abajo
    const targetRotY = x * 0.7;     // giro izquierda/derecha
    const targetPosY = -y * 0.2;    // sutil flotar vertical

    if (!ref.current) return;

    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.12);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.12);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPosY, 0.12);

    // rotación de “idle” ultra suave cuando no hay movimiento
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      Math.sin(state.clock.elapsedTime * 0.3) * 0.05,
      0.05
    );
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function HeroModel() {
  return (
    <div className="w-full h-[50vh] md:h-[75vh]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.6], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -3, 2]} intensity={0.3} />

        <Suspense fallback={null}>
          <PhoneModel />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Precarga (opcional)
useGLTF.preload('/models/phone_with_leads_optimized.glb');
