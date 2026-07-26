import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLogoGlassColors } from '../hooks/useLogoGlassColors';
import { useHeroVideoTexture } from '../hooks/useHeroVideoTexture';
import { useScrambleSequence } from '../hooks/useScrambleSequence';

const SYNE_FONT = '/fonts/syne-800.woff';
const HDRI = '/hdri/studio_1k.hdr';
const FONT_SIZE = 0.56;
const SEGMENT_GAP = 0.006;
const WORD_LEFT = -3.5;
const WORD_BOTTOM = -1.35;

const UNDERLINE_Y = -FONT_SIZE * 0.47;
const UNDERLINE_HEIGHT = 0.019;

const GLASS_VIDEO_SURFACE = {
  color: '#c8c8ce',
  emissive: '#94949e',
  emissiveIntensity: 0.36,
  transmission: 0.34,
  thickness: 0.95,
  roughness: 0.14,
  metalness: 0,
  ior: 1.5,
  clearcoat: 0.45,
  clearcoatRoughness: 0.08,
  attenuationColor: '#b0b0b8',
  attenuationDistance: 0.85,
  envMapIntensity: 0.5,
  transparent: true,
  side: THREE.DoubleSide,
};

function GlassMaterial({ tint, attenuation, opacity, videoTexture }) {
  const hasVideo = Boolean(videoTexture);

  if (hasVideo) {
    return (
      <meshPhysicalMaterial
        map={videoTexture}
        opacity={0.78}
        {...GLASS_VIDEO_SURFACE}
      />
    );
  }

  return (
    <meshPhysicalMaterial
      color={tint}
      transmission={0.94}
      thickness={1.1}
      roughness={0.05}
      metalness={0}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.03}
      attenuationColor={attenuation}
      attenuationDistance={0.85}
      envMapIntensity={1.8}
      transparent
      opacity={opacity}
      side={THREE.DoubleSide}
    />
  );
}

function GlassLights() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[3, 5, 6]} intensity={0.85} color="#ffffff" />
      <directionalLight position={[-5, 2, 4]} intensity={0.35} color="#cccccc" />
      <pointLight position={[WORD_LEFT + 4, WORD_BOTTOM + 1, 4]} intensity={14} distance={18} decay={2} color="#e8e8ec" />
      <pointLight position={[WORD_LEFT + 1, WORD_BOTTOM - 0.5, 3]} intensity={8} distance={14} decay={2} color="#aaaaaa" />
    </>
  );
}

function measureTextWidth(textRef) {
  if (!textRef?.geometry) return 0;
  textRef.geometry.computeBoundingBox();
  const box = textRef.geometry.boundingBox;
  if (!box) return 0;
  return box.max.x - box.min.x;
}

function GlassUnderline({ x, width, totalWidth, visible, videoTexture, z = 0.02 }) {
  const meshRef = useRef(null);
  const opacityRef = useRef(0);

  const alignedTexture = useMemo(() => {
    if (!videoTexture || width <= 0 || totalWidth <= 0) return null;

    const tex = videoTexture.clone();
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;

    const uScale = (width / totalWidth) * videoTexture.repeat.x;
    const uOffset = videoTexture.offset.x + (x / totalWidth) * videoTexture.repeat.x;
    tex.repeat.set(Math.max(uScale, 0.001), videoTexture.repeat.y * 0.14);
    tex.offset.set(uOffset, videoTexture.offset.y);
    tex.needsUpdate = true;

    return tex;
  }, [videoTexture, x, width, totalWidth]);

  useEffect(() => () => alignedTexture?.dispose(), [alignedTexture]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh?.material) return;

    const target = visible ? 1 : 0;
    opacityRef.current += (target - opacityRef.current) * 0.14;
    mesh.material.opacity = 0.78 * opacityRef.current;
    mesh.visible = opacityRef.current > 0.02 && Boolean(alignedTexture);
  });

  if (width <= 0 || !alignedTexture) return null;

  return (
    <mesh ref={meshRef} position={[x + width / 2, UNDERLINE_Y, z]} visible={false}>
      <boxGeometry args={[width, UNDERLINE_HEIGHT, 0.012]} />
      <meshPhysicalMaterial map={alignedTexture} opacity={0} {...GLASS_VIDEO_SURFACE} />
    </mesh>
  );
}

function GlassSegment({ text, variant, colors, x, z = 0, onWidth, videoTexture }) {
  if (!text) return null;

  const isMorph = variant === 'morph';
  const tint = isMorph ? colors.morph : colors.base;
  const attenuation = isMorph ? colors.morph : colors.base;

  return (
    <Text
      font={SYNE_FONT}
      fontSize={FONT_SIZE}
      letterSpacing={-0.02}
      anchorX="left"
      anchorY="middle"
      position={[x, 0, z]}
      outlineWidth={0.004}
      outlineColor="#d4d4da"
      outlineOpacity={0.24}
      onSync={(self) => onWidth?.(measureTextWidth(self))}
    >
      {text}
      <GlassMaterial
        tint={tint}
        attenuation={attenuation}
        opacity={colors.opacity}
        videoTexture={videoTexture}
      />
    </Text>
  );
}

function GlassWord({ display, isAccentMid, hasTail, colors, videoTexture, underlineMaydan, underlineDiana }) {
  const group = useRef(null);
  const [widths, setWidths] = useState({ may: 0.4, mid: 0.28, tail: 0 });

  const mayText = underlineMaydan ? 'May' : 'may';
  const midText = underlineDiana && display.mid === 'di' ? 'Di' : display.mid;

  const midVariant = isAccentMid ? 'morph' : 'base';
  const mayW = widths.may;
  const midW = widths.mid;
  const tailW = widths.tail;
  const tailX = mayW + SEGMENT_GAP + midW + SEGMENT_GAP;
  const maydanWidth = mayW + SEGMENT_GAP + midW;
  const dianaWidth = midW + SEGMENT_GAP + tailW;
  const dianaX = mayW + SEGMENT_GAP;
  const totalWidth = hasTail ? dianaX + dianaWidth : maydanWidth;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.x = WORD_LEFT;
    group.current.position.y = WORD_BOTTOM;
    group.current.rotation.y = Math.sin(t * 0.18) * 0.03;
    group.current.rotation.x = Math.sin(t * 0.13) * 0.01;
  });

  return (
    <group ref={group}>
      <GlassSegment
        text={mayText}
        variant="base"
        colors={colors}
        x={0}
        z={0.03}
        videoTexture={videoTexture}
        onWidth={(w) => setWidths((prev) => (prev.may === w ? prev : { ...prev, may: w }))}
      />
      <GlassSegment
        text={midText}
        variant={midVariant}
        colors={colors}
        x={mayW + SEGMENT_GAP}
        z={0}
        videoTexture={videoTexture}
        onWidth={(w) => setWidths((prev) => (prev.mid === w ? prev : { ...prev, mid: w }))}
      />
      {hasTail ? (
        <GlassSegment
          text={display.tail}
          variant="morph"
          colors={colors}
          x={tailX}
          z={-0.03}
          videoTexture={videoTexture}
          onWidth={(w) => setWidths((prev) => (prev.tail === w ? prev : { ...prev, tail: w }))}
        />
      ) : null}
      <GlassUnderline
        x={0}
        width={maydanWidth}
        totalWidth={totalWidth}
        visible={underlineMaydan}
        videoTexture={videoTexture}
        z={0.04}
      />
      <GlassUnderline
        x={dianaX}
        width={dianaWidth}
        totalWidth={totalWidth}
        visible={underlineDiana}
        videoTexture={videoTexture}
        z={0.04}
      />
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 7.4);
    camera.lookAt(0, 0, 0);
    if ('fov' in camera) {
      camera.fov = 34;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return null;
}

function SceneContent() {
  const colors = useLogoGlassColors();
  const { display, isAccentMid, hasTail, underlineMaydan, underlineDiana } = useScrambleSequence();
  const videoTexture = useHeroVideoTexture();

  return (
    <>
      <CameraSetup />
      <Environment files={HDRI} environmentIntensity={1.4} />
      <GlassLights />
      <GlassWord
        display={display}
        isAccentMid={isAccentMid}
        hasTail={hasTail}
        colors={colors}
        videoTexture={videoTexture}
        underlineMaydan={underlineMaydan}
        underlineDiana={underlineDiana}
      />
    </>
  );
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg-0)]">
          <p className="font-[family-name:var(--font-display)] text-[clamp(44px,9vw,72px)] font-extrabold tracking-tight text-white/80">
            maydi
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HeroGlassScene() {
  const [active, setActive] = useState(true);
  const rootRef = useRef(null);

  useEffect(() => {
    const hero = rootRef.current?.closest('.hero-below-grid');
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { threshold: 0.06 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <SceneErrorBoundary>
      <div ref={rootRef} className="hero-glass-scene pointer-events-none h-full w-full">
        <Canvas
          className="hero-glass-scene__canvas"
          dpr={[1, 1.25]}
          frameloop={active ? 'always' : 'never'}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          camera={{ position: [0, 0, 7.4], fov: 34 }}
          style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
