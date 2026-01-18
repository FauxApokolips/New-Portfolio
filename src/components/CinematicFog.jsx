import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function FogScene() {
  const group = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = Math.sin(t * 0.05) * 0.1;
      group.current.rotation.y = Math.cos(t * 0.05) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[20, 20, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          depthTest={false}
          fragmentShader={`
            uniform float time;
            varying vec2 vUv;
            void main() {
              float fog = smoothstep(0.0, 1.0, sin(vUv.x * 8.0 + time * 0.2));
              gl_FragColor = vec4(0.05, 0.2, 0.35, fog * 0.25);
            }
          `}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          uniforms={{
            time: { value: 0 },
          }}
        />
      </mesh>
    </group>
  );
}

export default function CinematicFog() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <color attach="background" args={["#050510"]} />
      <FogScene />
    </Canvas>
  );
}
