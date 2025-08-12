/// <reference types="@react-three/fiber" />

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Phone3D from "./Phone3D";
import phoneUi from "./assets/backgroundBlur.png";

export default function Scene() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#0b0b0f" }}>
      <Canvas camera={{ fov: 35, position: [1.5, 1.2, 2] }}>
        <color attach="background" args={["#0b0b0f"]} />
        <Environment preset="city" />
        <hemisphereLight args={[0xffffff, 0x090909, 0.9]} />
        <directionalLight position={[1, 1, 1]} intensity={1} />

        <Phone3D uiTextureUrl={phoneUi} scale={8} />

        <OrbitControls enableDamping target={[0, 0.425, 0]} />
      </Canvas>
    </div>
  );
}

