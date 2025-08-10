import * as THREE from "three";
import React, { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { GLTFExporter } from "three-stdlib";

type Props = {
  uiTextureUrl: string;            // URL pública de tu imagen de UI
  autoRotate?: boolean;
};

function ExportGLBButton() {
  const { scene } = useThree();
  const onClick = React.useCallback(() => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (bin: ArrayBuffer) => {
        const blob = new Blob([bin], { type: "model/gltf-binary" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "phone_glass_black.glb";
        a.click();
        URL.revokeObjectURL(a.href);
      },
      { binary: true }
    );
  }, [scene]);

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 10,
      }}
    >
      <button
        onClick={onClick}
        style={{
          padding: "10px 14px",
          borderRadius: 12,
          border: 0,
          background: "#6b46c1",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Exportar .glb
      </button>
    </div>
  );
}

function RoundedRectShape(w: number, h: number, r: number) {
  const hw = w / 2,
    hh = h / 2;
  const s = new THREE.Shape();
  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.quadraticCurveTo(hw, -hh, hw, -hh + r);
  s.lineTo(hw, hh - r);
  s.quadraticCurveTo(hw, hh, hw - r, hh);
  s.lineTo(-hw + r, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - r);
  s.lineTo(-hw, -hh + r);
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  return s;
}

function PhoneMesh({ uiTextureUrl }: { uiTextureUrl: string }) {
  // Medidas (metros)
  const W = 0.076;
  const H = 0.164;
  const D = 0.0085;
  const R = 0.011;
  const BEZEL = 0.0042;
  const FRAME_H = 0.0012;

  const tex = useTexture(uiTextureUrl);
  useMemo(() => {
    (tex as any).colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  // Geos
  const chassisGeo = useMemo(() => {
    const shape = RoundedRectShape(W, H, R);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: D,
      bevelEnabled: true,
      bevelThickness: 0.0012,
      bevelSize: 0.0012,
      bevelSegments: 6,
      curveSegments: 64,
      steps: 1,
    });
    geo.rotateX(Math.PI / 2);
    geo.translate(0, H / 2, 0);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const ringGeo = useMemo(() => {
    const outer = RoundedRectShape(W, H, R);
    const inner = RoundedRectShape(W - 2 * BEZEL, H - 2 * BEZEL, Math.max(0.0008, R - BEZEL));
    (outer as any).holes.push(inner);
    const geo = new THREE.ExtrudeGeometry(outer, {
      depth: FRAME_H,
      bevelEnabled: false,
      curveSegments: 64,
      steps: 1,
    });
    geo.rotateX(Math.PI / 2);
    geo.translate(0, H / 2, -D / 2 + 0.001);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const screenGeo = useMemo(() => {
    const shape = RoundedRectShape(W - 2 * BEZEL, H - 2 * BEZEL, Math.max(0.0008, R - BEZEL));
    const geo = new THREE.ShapeGeometry(shape, 64);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, H / 2, -D / 2 + 0.0009);
    return geo;
  }, []);

  // Materiales
  const matChassis = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x080808,
        roughness: 0.95,
        metalness: 0.05,
      }),
    []
  );

  const matRing = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x101010,
        roughness: 0.6,
        metalness: 0.2,
      }),
    []
  );

  const matScreen = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: tex,
        clearcoat: 0.7,
        clearcoatRoughness: 0.15,
        roughness: 0.9,
        metalness: 0.0,
        envMapIntensity: 0.8,
      }),
    [tex]
  );

  // Botones
  const Button = ({
    pos,
    size,
  }: {
    pos: [number, number, number];
    size: [number, number, number];
  }) => (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial color="#111" roughness={0.6} metalness={0.2} />
    </mesh>
  );

  const t = 0.002,
    len = 0.019,
    hgt = 0.0028;

  return (
    <group>
      <mesh geometry={chassisGeo} material={matChassis} />
      <mesh geometry={ringGeo} material={matRing} />
      <mesh geometry={screenGeo} material={matScreen} />
      {/* Botón power (derecha) */}
      <Button pos={[W / 2 - t / 2, H / 2 + 0.022, 0]} size={[t, len, hgt]} />
      {/* Volumen (izquierda) */}
      <Button pos={[-W / 2 + t / 2, H / 2 + 0.036, 0]} size={[t, len, hgt]} />
      <Button pos={[-W / 2 + t / 2, H / 2 + 0.012, 0]} size={[t, len, hgt]} />
      {/* Ranura altavoz superior */}
      <Button pos={[0, H - 0.013, -D / 2 + 0.0012]} size={[0.016, 0.0022, 0.0008]} />
    </group>
  );
}

export default function Phone3D({ uiTextureUrl, autoRotate = true }: Props) {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", background: "#0b0b0f" }}>
      <ExportGLBButton />
      <Canvas camera={{ fov: 35, position: [0.18, 0.14, 0.22] }}>
        <color attach="background" args={["#0b0b0f"]} />
        <Environment preset="city" />
        <hemisphereLight args={[0xffffff, 0x090909, 0.9]} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <PhoneMesh uiTextureUrl={uiTextureUrl} />
        <OrbitControls enableDamping target={[0, 0.085, 0]} autoRotate={autoRotate} autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
