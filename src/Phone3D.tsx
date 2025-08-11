/// <reference types="@react-three/fiber" />

import * as THREE from "three";
import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";

export interface Phone3DProps {
  /** URL pública de tu imagen de la UI morada */
  uiTextureUrl: string;
  /** Escala opcional del teléfono (1 = tamaño realista) */
  scale?: number;
}

function roundedRectShape(w: number, h: number, r: number) {
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

export default function Phone3D({ uiTextureUrl, scale = 1 }: Phone3DProps) {
  // Medidas (m) realistas
  const W = 0.076;
  const H = 0.164;
  const D = 0.0085;
  const R = 0.011;
  const BEZEL = 0.0042;
  const FRAME_H = 0.0012;

  // TEXTURA UI
  const texture = useLoader(THREE.TextureLoader, uiTextureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  // CHASIS (extrusión con esquinas redondeadas)
  const chassisGeo = useMemo(() => {
    const shape = roundedRectShape(W, H, R);
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

  // MARCO (anillo frontal)
  const ringGeo = useMemo(() => {
    const outer = roundedRectShape(W, H, R);
    const inner = roundedRectShape(
      W - 2 * BEZEL,
      H - 2 * BEZEL,
      Math.max(0.0008, R - BEZEL)
    );
    (outer as any).holes.push(inner);
    const geo = new THREE.ExtrudeGeometry(outer, {
      depth: FRAME_H,
      bevelEnabled: false,
      curveSegments: 64,
      steps: 1,
    });
    geo.rotateX(Math.PI / 2);
    geo.translate(0, H / 2, -D / 2 + 0.001); // cerca del frente
    geo.computeVertexNormals();
    return geo;
  }, []);

  // PANTALLA (plano redondeado con vidrio)
  const screenGeo = useMemo(() => {
    const shape = roundedRectShape(
      W - 2 * BEZEL,
      H - 2 * BEZEL,
      Math.max(0.0008, R - BEZEL)
    );
    const geo = new THREE.ShapeGeometry(shape, 64);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, H / 2, -D / 2 + 0.0009);
    return geo;
  }, []);

  // MATERIALES
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
        map: texture,
        clearcoat: 0.7,
        clearcoatRoughness: 0.15,
        roughness: 0.9,
        metalness: 0.0,
        envMapIntensity: 0.8,
      }),
    [texture]
  );

  // BOTONES
  const t = 0.002,
    len = 0.019,
    hgt = 0.0028;

  return (
    <group scale={scale}>
      <mesh geometry={chassisGeo} material={matChassis} />
      <mesh geometry={ringGeo} material={matRing} />
      <mesh geometry={screenGeo} material={matScreen} />

      {/* Power (derecha) */}
      <mesh position={[W / 2 - t / 2, H / 2 + 0.022, 0]}>
        <boxGeometry args={[t, len, hgt]} />
        <meshPhysicalMaterial color="#111" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Volumen (izquierda) */}
      <mesh position={[-W / 2 + t / 2, H / 2 + 0.036, 0]}>
        <boxGeometry args={[t, len, hgt]} />
        <meshPhysicalMaterial color="#111" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[-W / 2 + t / 2, H / 2 + 0.012, 0]}>
        <boxGeometry args={[t, len, hgt]} />
        <meshPhysicalMaterial color="#111" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Ranura altavoz superior */}
      <mesh position={[0, H - 0.013, -D / 2 + 0.0012]}>
        <boxGeometry args={[0.016, 0.0022, 0.0008]} />
        <meshPhysicalMaterial color="#111" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

