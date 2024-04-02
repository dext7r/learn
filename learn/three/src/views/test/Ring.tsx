import { FC } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshRefractionMaterial } from '@react-three/drei'
import * as THREE from 'three'


interface RingProps {
  frame: string;
  diamonds: string;
  env: any; // 根据实际情况定义环境映射的类型
  scale: number;
}

const Ring: FC<RingProps> = ({ frame, diamonds, env, scale }) => {
  const { nodes, materials } = useGLTF('/3-stone-transformed.glb') as any;

  return (
    <group scale={scale}>
      <mesh castShadow geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial color={frame} roughness={0.15} metalness={1} envMapIntensity={1.5} />
      </mesh>
      <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />
      <instancedMesh castShadow args={[nodes.mesh_4.geometry, null, 65]} instanceMatrix={nodes.mesh_4.instanceMatrix}>
        <MeshRefractionMaterial color={diamonds} side={THREE.DoubleSide} envMap={env} aberrationStrength={0.02} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

export default Ring
