import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function SakuraPetals() {
  const count = 40;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 8 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.3) * 0.005;
      vel[i * 3 + 1] = -Math.random() * 0.008 - 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];
      if (posArr[i * 3 + 1] < -4) {
        posArr[i * 3] = (Math.random() - 0.5) * 12;
        posArr[i * 3 + 1] = 5 + Math.random() * 3;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#38bdf8" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function FloatingOrb({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.25} roughness={0.9} />
      </mesh>
    </Float>
  );
}

function GentleShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2, 0.5, -2]}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.06} wireframe roughness={1} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#fff5ee" />
        <SakuraPetals />
        <GentleShape />
        <FloatingOrb position={[-3, 1, -1]} color="#38bdf8" speed={2} />
        <FloatingOrb position={[3, -1, -2]} color="#7dd3fc" speed={1.5} />
        <FloatingOrb position={[-1, 2, -3]} color="#0ea5e9" speed={1} />
      </Canvas>
    </div>
  );
}
