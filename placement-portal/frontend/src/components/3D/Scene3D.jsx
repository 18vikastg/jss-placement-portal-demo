import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Simple floating animation component
function FloatingElement({ position, color }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Simple brain-like structure
function SimpleBrain() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.2, 0.1, 8, 16]} />
        <meshStandardMaterial color="#06B6D4" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.08, 8, 16]} />
        <meshStandardMaterial color="#F59E0B" />
      </mesh>
    </group>
  )
}

// Simple particles
function SimpleParticles() {
  const particlesRef = useRef()
  const particleCount = 30
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return positions
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8B5CF6" />
    </points>
  )
}

// Main Scene Component
export default function Scene3D({ variant = 'brain' }) {
  const colors = ['#8B5CF6', '#06B6D4', '#F59E0B', '#10B981', '#F43F5E']
  
  const floatingElements = useMemo(() => {
    if (variant !== 'books') return null
    
    return Array.from({ length: 5 }, (_, i) => (
      <FloatingElement
        key={i}
        position={[
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        ]}
        color={colors[i % colors.length]}
      />
    ))
  }, [variant])

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        onCreated={(state) => {
          state.gl.setClearColor('transparent')
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B5CF6" />
        
        {variant === 'brain' && <SimpleBrain />}
        {variant === 'books' && floatingElements}
        {variant === 'particles' && <SimpleParticles />}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
