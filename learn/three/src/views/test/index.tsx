import { Canvas } from '@react-three/fiber'
import { FC } from 'react'
import Ring from './Ring'
import { Center, OrbitControls, AccumulativeShadows, RandomizedLight, useEnvironment, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, N8AO, ToneMapping } from '@react-three/postprocessing'
import { useControls } from 'leva'

interface TestpageProps {}

const Testpage: FC<TestpageProps> = () => {
  const { shadow, frame, diamonds } = useControls({ shadow: '#000000', frame: '#fff0f0', diamonds: '#ffffff' })
  const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })
  return (
    <Canvas className='w-full h-[100vh]' shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [-5, 5, 14], fov: 20 }}>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <group position={[0, -0.25, 0]}>
        <Center top position={[0, -0.12, 0]} rotation={[-0.1, 0, 0.085]}>
          <Ring frame={frame} diamonds={diamonds} env={env} scale={0.1} />
        </Center>
        <AccumulativeShadows temporal frames={100} color={shadow} opacity={1.05}>
          <RandomizedLight radius={5} position={[10, 5, -5]} />
        </AccumulativeShadows>
      </group>
      <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} />
      <EffectComposer>
        <N8AO aoRadius={0.15} intensity={4} distanceFalloff={2} />
        <Bloom luminanceThreshold={3.5} intensity={0.85} levels={9} mipmapBlur />
        <ToneMapping />
      </EffectComposer>
      <Environment map={env} background blur={1} />
    </Canvas>
  )
}

export default Testpage
