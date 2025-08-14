import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useControls} from 'leva'

export function BoxBoy(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/box_boy (1).glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    actions['Controls|RunCycle'].play()
  },[])
// const { scale, position, rotation } = useControls({
//     scale : 2.5,
//     position : {
//       x: 0,
//       y:-2,
//       z:0
//     },
//     rotation : {
//         x: 0,
//       y:0,
//       z:0
//     }
//   })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" 
        // rotation={[-Math.PI / 2, 0, 0]}
        rotation={[4.50,0,0.15]} 
        scale={2.5} position={[0,-2,0]}>
          <group
            name="f598d1dcae204bb297e79845b026fefcfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="BoxBoy"
                  position={[0, 87.051, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group name="Controls" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.BoxBoy}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group
                      name="Object_8"
                      position={[0, 87.051, 0]}
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

useGLTF.preload('/models/box_boy (1).glb')

export default BoxBoy;

//JumpCycle
//NormalWalk
//RunCycle
//WalkCycle