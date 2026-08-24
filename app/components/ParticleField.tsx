"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Particles({ count = 120 }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3) - 0.5) * 12;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 8;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 6;
      sz[i] = seededRandom(i * 3 + 3) * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime() * 0.08;
    mesh.current.rotation.y = t * 0.05;
    mesh.current.rotation.x = Math.sin(t) * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uColor: { value: new THREE.Color("#f2e8e0") },
          uOpacity: { value: 0.35 },
        }}
        vertexShader={`
          attribute float size;
          varying float vAlpha;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            vAlpha = 1.0 - smoothstep(2.0, 8.0, -mvPosition.z);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vAlpha;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float alpha = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(uColor, alpha * uOpacity * vAlpha);
          }
        `}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
