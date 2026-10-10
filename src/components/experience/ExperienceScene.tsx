"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

/**
 * The 3D walk-through. Photos hang in a corridor that recedes into fog; the
 * camera dollies forward as the page scrolls, stepping *through* each photo
 * (it dissolves as you pass) to reach the next. Embers rise through the
 * whole space and a smoke layer rides just in front of the camera.
 *
 * Scroll position comes in through `progress` (0–1) — a ref, so scrolling
 * never re-renders React.
 */

/** `urls` are tried in order — e.g. an optimized URL, then the original file. */
export type ScenePhoto = { urls: string[]; aspect: number };

const GAP = 11; // distance between photos along z
const VIEW = 7.2; // camera distance in front of the photo it's looking at
const H = 5.6; // photo height in world units

/** `spread` narrows the zig-zag on tall, narrow screens so photos stay in frame. */
const layout = (i: number, spread = 1) => ({
  x: (i === 0 ? 0 : i % 2 ? 1.5 : -1.5) * spread,
  z: -i * GAP,
  rotY: (i === 0 ? 0 : i % 2 ? -0.16 : 0.16) * spread,
});

/** Viewport-dependent framing: spread and the widest a photo can be at VIEW distance. */
const fovFor = (aspect: number) => (aspect < 1 ? 62 : 50);

function useFraming() {
  const size = useThree((s) => s.size);
  const aspect = size.width / Math.max(1, size.height);
  const fov = fovFor(aspect);
  const visibleW = 2 * VIEW * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * aspect;
  // On portrait screens, lift photos into the top half so the chapter text below stays clear
  return { spread: Math.min(1, aspect / 1.4), maxW: visibleW * 0.92, lift: aspect < 1 ? 1.9 : 0 };
}

function loadFirst(loader: THREE.TextureLoader, urls: string[]): Promise<THREE.Texture> {
  return urls.reduce<Promise<THREE.Texture>>(
    (prev, url) => prev.catch(() => loader.loadAsync(url)),
    Promise.reject(new Error("no url")),
  );
}

const smooth = (t: number) => t * t * (3 - 2 * t);

function Panels({
  photos,
  onReady,
  onError,
}: {
  photos: ScenePhoto[];
  onReady: () => void;
  onError: () => void;
}) {
  const gl = useThree((s) => s.gl);
  const { spread, maxW, lift } = useFraming();
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const groups = useRef<(THREE.Group | null)[]>([]);

  // Load every photo before showing anything; any failure hands control back
  // to the plain photo layer instead of breaking the page.
  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    Promise.all(photos.map((p) => loadFirst(loader, p.urls)))
      .then((list) => {
        if (cancelled) return list.forEach((t) => t.dispose());
        list.forEach((t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = aniso;
        });
        setTextures(list);
        onReady();
      })
      .catch(() => !cancelled && onError());
    return () => {
      cancelled = true;
    };
  }, [photos, gl, onReady, onError]);

  useEffect(() => () => textures?.forEach((t) => t.dispose()), [textures]);

  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    photos.forEach((_, i) => {
      const m = mats.current[i];
      const g = groups.current[i];
      if (!m || !g) return;
      const dz = camera.position.z - layout(i, spread).z;
      // Dissolve as the camera walks through the photo
      m.opacity = THREE.MathUtils.clamp(smooth(THREE.MathUtils.clamp((dz - 0.6) / 3, 0, 1)), 0, 1);
      g.visible = m.opacity > 0.01;
      g.position.y = lift + Math.sin(t * 0.4 + i) * 0.06;
    });
  });

  if (!textures) return null;

  return (
    <>
      {photos.map((p, i) => {
        const { x, z, rotY } = layout(i, spread);
        const w = Math.min(H * p.aspect, H * 1.9, maxW);
        const h = w / p.aspect;
        return (
          <group
            key={p.urls[0]}
            ref={(el) => {
              groups.current[i] = el;
            }}
            position={[x, lift, z]}
            rotation={[0, rotY, 0]}
          >
            <mesh>
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial
                ref={(el) => {
                  mats.current[i] = el;
                }}
                map={textures[i]}
                transparent
                toneMapped={false}
              />
            </mesh>
            {/* Ember rule under each photo */}
            <mesh position={[-w / 2 + w * 0.18, -h / 2 - 0.22, 0]}>
              <planeGeometry args={[w * 0.36, 0.035]} />
              <meshBasicMaterial color="#d65a35" toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function CameraRig({ count, progress }: { count: number; progress: RefObject<number> }) {
  const { camera, pointer } = useThree();
  const { spread } = useFraming();
  const target = useMemo(() => new THREE.Vector3(0, 0, VIEW), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    // Wider field of view on portrait screens so photos stay in frame
    const cam = state.camera as THREE.PerspectiveCamera;
    const fov = fovFor(state.size.width / Math.max(1, state.size.height));
    if (cam.fov !== fov) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    const p = THREE.MathUtils.clamp(progress.current ?? 0, 0, 1);
    const s = p * (count - 1);
    const i = Math.min(Math.floor(s), count - 2);
    const f = smooth(THREE.MathUtils.clamp(s - i, 0, 1));
    const a = layout(i, spread);
    const b = layout(i + 1, spread);
    const x = THREE.MathUtils.lerp(a.x, b.x, f);
    const z = THREE.MathUtils.lerp(a.z, b.z, f) + VIEW;
    target.set(x * 0.85 + pointer.x * 0.35, pointer.y * 0.2, z);
    const k = 1 - Math.pow(0.0015, delta); // frame-rate independent easing
    camera.position.lerp(target, k);
    lookTarget.set(x * 0.85, 0, camera.position.z - VIEW);
    look.lerp(lookTarget, k);
    camera.lookAt(look);
  });
  return null;
}

const smokeFrag = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }
  void main() {
    vec2 p = vUv * vec2(3.0, 1.8);
    float t = uTime * 0.05;
    vec2 q = vec2(fbm(p + vec2(0.0, -t * 2.0)), fbm(p + vec2(5.2, 1.3 - t * 1.4)));
    float n = fbm(p + 1.7 * q + vec2(t, -t * 2.5));
    float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
    float low = smoothstep(1.0, 0.2, vUv.y);
    float a = smoothstep(0.45, 0.95, n) * edge * low;
    gl_FragColor = vec4(vec3(0.9, 0.82, 0.7), a * 0.22);
  }
`;
const smokeVert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

function Smoke() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const fwd = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }, delta) => {
    if (!mesh.current || !mat.current) return;
    mat.current.uniforms.uTime.value += delta;
    camera.getWorldDirection(fwd);
    mesh.current.position.copy(camera.position).addScaledVector(fwd, 4);
    mesh.current.quaternion.copy(camera.quaternion);
  });
  return (
    <mesh ref={mesh} renderOrder={10}>
      <planeGeometry args={[10, 5.5]} />
      <shaderMaterial
        ref={mat}
        vertexShader={smokeVert}
        fragmentShader={smokeFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

const emberVert = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vHeat;
  void main() {
    vec3 p = position;
    float life = fract(uTime * (0.04 + aSeed * 0.05) + aSeed);
    p.y += life * 8.0;
    p.x += sin(uTime * 0.6 + aSeed * 40.0) * 0.35 * life;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float flicker = 0.6 + 0.4 * sin(uTime * (5.0 + aSeed * 9.0) + aSeed * 50.0);
    vAlpha = smoothstep(0.0, 0.1, life) * (1.0 - smoothstep(0.6, 1.0, life)) * flicker;
    vHeat = 1.0 - life;
    gl_PointSize = (2.5 + aSeed * 5.0) * uPixelRatio * (6.0 / -mv.z);
  }
`;
const emberFrag = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying float vHeat;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    vec3 col = mix(vec3(0.73, 0.28, 0.16), vec3(1.0, 0.8, 0.45), vHeat);
    gl_FragColor = vec4(col, core * core * vAlpha);
  }
`;

function Embers({ length, count }: { length: number; count: number }) {
  const gl = useThree((s) => s.gl);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let s = 11;
    const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = -7 + rand() * 14;
      positions[i * 3 + 1] = -5 + rand() * 2;
      positions[i * 3 + 2] = VIEW + 2 - rand() * (length + VIEW + 6);
      seeds[i] = rand();
    }
    return { positions, seeds };
  }, [length, count]);
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
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={emberVert}
        fragmentShader={emberFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ExperienceScene({
  photos,
  progress,
  active,
  lite,
  onReady,
  onError,
}: {
  photos: ScenePhoto[];
  progress: RefObject<number>;
  active: boolean;
  /** Phones and tablets: fewer particles, lower resolution */
  lite: boolean;
  onReady: () => void;
  onError: () => void;
}) {
  return (
    <Canvas
      aria-hidden
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, VIEW], fov: 50, near: 0.1, far: 80 }}
      gl={{ antialias: !lite, alpha: false, powerPreference: lite ? "default" : "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      onCreated={({ scene, gl }) => {
        scene.background = new THREE.Color("#0f1a2e");
        scene.fog = new THREE.Fog("#0f1a2e", 9, 28);
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Panels photos={photos} onReady={onReady} onError={onError} />
      <Embers length={(photos.length - 1) * GAP} count={lite ? 220 : 520} />
      <Smoke />
      <CameraRig count={photos.length} progress={progress} />
    </Canvas>
  );
}
