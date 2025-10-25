import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../NavBar'
import { OrbitControls, Environment, ContactShadows, Loader, Html, PerspectiveCamera } from '@react-three/drei'
import { Stars } from '@react-three/drei'
import { CameraLogger } from '../CameraLogger'
import { CameraController } from '../CameraController'
import { SpaceStation } from '../SpaceStation'
import BackGroundMusic from '../BackGroundMusic'
import { useResponsivePosition, useResponsiveScale } from '../../utility/responsiveHooks'
import { Outlet, useLocation } from 'react-router-dom'
import { FlyingAstro } from '../FlyingAstro'

const Home = () => {
    const { userData} = useSelector(state => state.user);
      const spaceStationScale = useResponsiveScale(0.2, 0.5);
      const spaceStationPosition = useResponsivePosition([0, -0.01, 0],[0, -0.75, 0]);
      const flyingAstroPosition = useResponsivePosition([1, -3, 0],[-3, 1.5, 0]);
      const spaceshipRef = useRef();
      const {pathname} = useLocation();
  return (
    <section className='w-full h-screen flex flex-col justify-center items-center'>
      <Navbar/>
        <Canvas
                shadows
                camera={{ position: [0, 2, 6], fov: 45 }}
                dpr={[1, 2]}
                style={{ background: "black" }}
                className='w-100'
              >
                {/* basic lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
                <Stars
                  radius={150}   // farther stars
                  depth={60}     // starfield depth
                  count={8000}   // number of stars
                  factor={6}     // star size
                  saturation={0} // keep stars white
                  fade           // fade on camera move
                  speed={2}      // twinkling speed
                />
                      <CameraLogger/>
                      <CameraController />
                <Suspense fallback={null}>
                  <Environment
                    files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/studio_small_03_4k.hdr"
                    background={false}
                    preset='sunset'
                  />
                  <group position={spaceStationPosition} ref={spaceshipRef}>
                    <SpaceStation scale={spaceStationScale}
                     rotation={[0.7, -2*Math.PI * 0.25, 0]} 
                     />
                    <ContactShadows position={[0, -0.76, 0]} opacity={0.5} blur={2} far={5} />
                  </group>
                  {
                    (pathname === '/' || pathname === '/projects') &&
                    <FlyingAstro position={flyingAstroPosition} scale={0.006}  spaceshipRef={spaceshipRef}/>
                  }
                     
                  {/* camera controls */}
                  <OrbitControls makeDefault enableDamping />
                </Suspense>
              </Canvas>
              <Loader />
                    <BackGroundMusic/>
                    <Outlet/>
    </section>

  )
}

export default Home