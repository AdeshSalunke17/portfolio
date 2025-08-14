import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import BoxBoy from '../boxboy/BoxBoy'
import style from './Home.module.css'
import { OrbitControls } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { ReactTyped } from "react-typed";
import CanvasLoader from '../canvasloader/CanvasLoader'
const Home = () => {
    const { userData} = useSelector(state => state.user);
  return (
    <div className='w-full grid grid-cols-12 h-full'>
        {/* <div className={`md:col-span-6 col-span-12`}>
            <Canvas>
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls minDistance={5} maxDistance={30}/>
                <ambientLight intensity={1}/>
                <BoxBoy/>
            </Suspense>
            </Canvas>
        </div> */}
        <div className='md:col-span-6 col-span-12 p-20 pl-0'>
             {
                userData.userDesc &&
             <ReactTyped strings={[userData.userDesc]} typeSpeed={50} className='font-medium text-3xl leading-10'/>
            // <p className='font-medium md:text-3xl md:leading-10 sm:leading-7'>{userData.userDesc}</p>
             }
        </div>
    </div>

  )
}

export default Home