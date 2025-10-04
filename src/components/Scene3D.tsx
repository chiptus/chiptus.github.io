import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.5) * 0.5;
      sphereRef.current.rotation.x = t * 0.2;
      sphereRef.current.rotation.y = t * 0.3;
    }
    
    if (boxRef.current) {
      boxRef.current.position.y = Math.cos(t * 0.7) * 0.3;
      boxRef.current.rotation.x = t * 0.15;
      boxRef.current.rotation.z = t * 0.25;
    }
    
    if (torusRef.current) {
      torusRef.current.position.y = Math.sin(t * 0.3 + 2) * 0.4;
      torusRef.current.rotation.x = t * 0.1;
      torusRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <>
      <Sphere ref={sphereRef} args={[0.5, 32, 32]} position={[-2, 0, 0]}>
        <meshStandardMaterial color="#5ca3ea" wireframe />
      </Sphere>
      
      <Box ref={boxRef} args={[0.7, 0.7, 0.7]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#5ca3ea" wireframe />
      </Box>
      
      <Torus ref={torusRef} args={[0.4, 0.15, 16, 100]} position={[0, 0, -1]}>
        <meshStandardMaterial color="#5ca3ea" wireframe />
      </Torus>
    </>
  );
}

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingShapes />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
