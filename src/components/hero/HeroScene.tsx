"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Atmospheric WebGL layer for the hero: drifting oak smoke (an fbm shader
 * plane) and rising embers (instanced points at varying depths). The
 * photograph stays the hero — this only adds air and depth around it.
 *
 * Embers are spread through z, so the pointer-driven camera produces real
 * parallax rather than a flat image rotating.
 */

const smokeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const smokeFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uIntensity;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * vec2(3.0, 2.0);
    p += uPointer * 0.15;
    float t = uTime * 0.045;
    vec2 q = vec2(fbm(p + vec2(0.0, -t * 2.0)), fbm(p + vec2(5.2, 1.3 - t * 1.6)));
    float n = fbm(p + 1.8 * q + vec2(t * 0.6, -t * 3.0));

    // Smoke rises from the lower right where the food sits, thins toward the top
    float plume = smoothstep(0.0, 0.65, 1.0 - uv.y) * 0.6 + 0.4;
    float sideFade = smoothstep(0.0, 0.35, uv.x) * smoothstep(1.0, 0.75, uv.x);
    float a = smoothstep(0.42, 0.95, n) * plume * sideFade * uIntensity;

    vec3 warm = vec3(0.93, 0.82, 0.68);
    vec3 cool = vec3(0.64, 0.60, 0.55);
    vec3 col = mix(cool, warm, smoothstep(0.3, 0.9, 1.0 - uv.y));
    gl_FragColor = vec4(col, a * 0.32);
  }
`;

function Smoke() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, pointer } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uIntensity: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += delta;
    u.uPointer.value.lerp(pointer, 0.03);
    // Fade in on mount rather than popping
    u.uIntensity.value = Math.min(1, u.uIntensity.value + delta * 0.4);
  });

  return (
    <mesh position={[0, 0, -1]} scale={[viewport.width * 1.3, viewport.height * 1.3, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={smokeVertex}
        fragmentShader={smokeFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

const emberVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vHeat;
  void main() {
    vec3 p = position;
    float life = fract(uTime * aSpeed * 0.06 + aSeed);
    p.y += life * 7.0;
    p.x += sin(uTime * 0.7 + aSeed * 40.0) * 0.25 * life + life * 0.6;
    p.z += cos(uTime * 0.5 + aSeed * 23.0) * 0.15;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float flicker = 0.65 + 0.35 * sin(uTime * (6.0 + aSeed * 9.0) + aSeed * 50.0);
    vAlpha = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.55, 1.0, life)) * flicker;
    vHeat = 1.0 - life;
    gl_PointSize = (3.0 + aSeed * 5.0) * uPixelRatio * (5.0 / -mv.z);
  }
`;

const emberFragment = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying float vHeat;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    vec3 hot = vec3(1.0, 0.78, 0.42);
    vec3 cool = vec3(0.73, 0.28, 0.16);
    vec3 col = mix(cool, hot, vHeat);
    gl_FragColor = vec4(col, core * core * vAlpha);
  }
`;

function Embers({ count = 160 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const gl = useThree((s) => s.gl);

  const { positions, seeds, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const speeds = new Float32Array(count);
    // Deterministic pseudo-random so renders are stable
    let s = 7;
    const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < count; i++) {
      // Weighted to the right half, where the food sits in the photograph
      positions[i * 3] = -1.5 + rand() * 7.5;
      positions[i * 3 + 1] = -4 + rand() * 1.5;
      positions[i * 3 + 2] = -3 + rand() * 5;
      seeds[i] = rand();
      speeds[i] = 0.6 + rand() * 1.2;
    }
    return { positions, seeds, speeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) } }),
    [gl],
  );

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={emberVertex}
        fragmentShader={emberFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    target.set(pointer.x * 0.45, pointer.y * 0.25, 6);
    camera.position.lerp(target, 0.035);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Smoke />
      <Embers />
      <CameraRig />
    </Canvas>
  );
}
