"use client";
import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vHeight;

  float h(vec2 p) {
    float t = uTime * 0.15;
    float w = sin(p.x * 1.2 + t * 2.0 + sin(p.y * 0.8 + t)) * 0.25;
    w += sin(p.x * 2.3 - p.y * 1.7 + t * 1.5) * 0.12;
    w += sin(p.y * 3.1 + t) * 0.05;
    float d = distance(p, uMouse);
    w += exp(-d * d * 1.5) * 0.18 * sin(d * 6.0 - uTime * 1.5);
    return w;
  }

  void main() {
    vUv = uv;
    vec2 p = position.xy;
    float e = 0.02;
    float height = h(p);
    float dx = (h(p + vec2(e, 0.0)) - h(p - vec2(e, 0.0))) / (2.0 * e);
    float dy = (h(p + vec2(0.0, e)) - h(p - vec2(0.0, e))) / (2.0 * e);
    vNormal = normalize(vec3(-dx, -dy, 1.0));
    vHeight = height;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, height, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uBase;
  uniform vec3 uGold;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vHeight;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 lightDir = normalize(vec3(-0.4, 0.6, 0.8));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float diffuse = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(n, halfDir), 0.0), 40.0);
    float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.5);
    float weave = sin(vUv.x * 900.0) * sin(vUv.y * 900.0) * 0.015;
    vec3 col = uBase * (0.55 + diffuse * 0.9);
    col += uGold * spec * 0.85;
    col += uGold * fresnel * 0.35;
    col += uGold * smoothstep(0.1, 0.35, vHeight) * 0.08;
    col += weave;
    float vig = smoothstep(1.05, 0.25, distance(vUv, vec2(0.5)));
    col *= mix(0.35, 1.0, vig);
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

function FabricPlane({ segments }: { segments: number }) {
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(10, 10));
  const target = useRef(new THREE.Vector2(10, 10));
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(10, 10) },
    uBase: { value: new THREE.Color("#1C1C1E") },
    uGold: { value: new THREE.Color("#B8975A") },
  }), []);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    target.current.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2);
    mouse.current.lerp(target.current, 0.06);
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh rotation={[-0.35, 0, 0.12]} position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, segments, segments]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

export default function FabricBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [segments, setSegments] = useState(128);

  useEffect(() => {
    setSegments(window.innerWidth < 768 ? 64 : 128);
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 3.2], fov: 50 }} gl={{ antialias: false, alpha: false }}>
        <FabricPlane segments={segments} />
      </Canvas>
    </div>
  );
}
