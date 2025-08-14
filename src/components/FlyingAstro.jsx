import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FlyingAstro({ spaceshipRef, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/astro_flying.glb')
  const { actions, names, mixer } = useAnimations(animations, group)

  const progress = useRef(0)
  const duration = 10 // seconds

  useEffect(() => {
    if (!actions) return
    const preferred = ['Flying', 'Fly', 'ArmatureAction', 'metarigAction', 'metarig|metarigAction', 'Idle']
    const clipName = names?.find(n => preferred.includes(n)) || names?.[0]
    const action = clipName ? actions[clipName] : undefined
    if (!action) return

    mixer.timeScale = 1
    action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play()

    if (process.env.NODE_ENV !== 'production') console.log('GLTF clips:', names)

    return () => action.fadeOut(0.2)
  }, [actions, names, mixer])

  useFrame((state, delta) => {
    if (group.current && spaceshipRef?.current) {
      const astro = group.current
      const spaceship = spaceshipRef.current

      // Increase progress
      progress.current += delta / duration

      // Reset when done (loop)
      if (progress.current > 1) {
        progress.current = 0
        // Reset astronaut back to start position & full scale
        if (props.position) astro.position.set(...props.position)
        astro.scale.setScalar(props.scale || 1)
      }

      // Interpolate position
      const startPos = props.position ? new THREE.Vector3(...props.position) : new THREE.Vector3()
      astro.position.lerpVectors(startPos, spaceship.position, progress.current)

      // Face the spaceship
      astro.lookAt(spaceship.position)

      // Scale down over time
      const startScale = props.scale || 1
      const newScale = Math.max(startScale * (1 - progress.current), 0.0001) // avoid true 0
      astro.scale.set(newScale, newScale, newScale)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="eac333c4ad9248fd9ae1e4dccb45a1a9fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Astro13LowPoly001"
                  position={[0.928, 16.966, -1.663]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="metarig"
                  position={[-0.121, -150.811, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={145.9}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials['Default.001']}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group
                      name="Object_8"
                      position={[0.928, 16.966, -1.663]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/astro_flying.glb')
