'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

// White "sticker" label drawn on a canvas, wrapped around the bottle front.
function useLabelTexture() {
  return useMemo(() => {
    const w = 512;
    const h = 300;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d')!;
    // rounded white sticker
    const r = 26;
    const m = 16;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(m + r, m);
    ctx.arcTo(w - m, m, w - m, h - m, r);
    ctx.arcTo(w - m, h - m, m, h - m, r);
    ctx.arcTo(m, h - m, m, m, r);
    ctx.arcTo(m, m, w - m, m, r);
    ctx.closePath();
    ctx.fill();
    // gold frame
    ctx.strokeStyle = '#C99A45';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.textAlign = 'center';
    // brand placeholder
    ctx.fillStyle = '#0B6B3A';
    ctx.font = '700 64px Inter, Arial, sans-serif';
    ctx.fillText('YOUR', w / 2, 118);
    ctx.fillText('BRAND', w / 2, 184);
    // sub line
    ctx.fillStyle = '#B07D2B';
    ctx.font = '600 26px Inter, Arial, sans-serif';
    ctx.fillText('PREMIUM MOTOR OIL', w / 2, 232);
    // accent rule
    ctx.fillStyle = '#CE1126';
    ctx.fillRect(w / 2 - 60, 250, 120, 5);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Bottle({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const label = useLabelTexture();

  // Bottle silhouette revolved around Y.
  const points = useMemo(
    () =>
      [
        [0.001, -1.15],
        [0.56, -1.15],
        [0.62, -1.05],
        [0.62, 0.42],
        [0.6, 0.58],
        [0.34, 0.96],
        [0.21, 1.08],
        [0.21, 1.3],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={group} rotation={[0, -0.5, 0]}>
      {/* body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 72]} />
        <meshPhysicalMaterial
          color="#0e1c15"
          roughness={0.32}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.18}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* neck ring */}
      <mesh position={[0, 1.18, 0]}>
        <torusGeometry args={[0.215, 0.03, 12, 48]} />
        <meshStandardMaterial color="#C99A45" metalness={0.9} roughness={0.28} />
      </mesh>

      {/* cap */}
      <mesh position={[0, 1.46, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.3, 48]} />
        <meshStandardMaterial color="#C99A45" metalness={0.85} roughness={0.3} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.205, 0.24, 0.04, 48]} />
        <meshStandardMaterial color="#E8D4A6" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* curved sticker label on the front */}
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.78, 64, 1, true, 0.62, 1.9]} />
        <meshStandardMaterial
          map={label}
          transparent
          roughness={0.5}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function OilBottleScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.35, 4.6], fov: 34 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 1, 2]} intensity={18} color="#E8D4A6" />
      <pointLight position={[3, -1, 2]} intensity={10} color="#2BA567" />

      <Float speed={reduced ? 0 : 1.3} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.5}>
        <Bottle animate={!reduced} />
      </Float>

      <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={6} blur={2.6} far={3} color="#0b3a26" />

      <Environment resolution={64}>
        <Lightformer position={[0, 3, 2]} scale={4} intensity={2} color="#ffffff" />
        <Lightformer position={[-3, 0, 1]} scale={3} intensity={1.6} color="#E8D4A6" />
        <Lightformer position={[3, 0, 1]} scale={3} intensity={1.2} color="#2BA567" />
      </Environment>
    </Canvas>
  );
}
