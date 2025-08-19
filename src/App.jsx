import { useEffect, useRef, useState } from 'react'
import './App.css'
import { store } from './config/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { saveUserData } from './features/user/userSlice'; 
import { saveUserProjects } from './features/userProjects/userProjectsSlice';
import Header from './components/header/Header';
import Home from './components/home/Home';
import BounceCards from './blocks/Components/BounceCards/BounceCards'
import RollingGallery from './blocks/Components/RollingGallery/RollingGallery'
import RotatingText from './blocks/TextAnimations/RotatingText/RotatingText';
import CustomRotatingText from './components/customerotatingtext/CustomRotatingText';
import { useScroll, useSpring,animated } from '@react-spring/web';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Loader, Html, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { SpaceStation } from './components/SpaceStation';
import { Stars } from '@react-three/drei'
import { CameraLogger } from './components/CameraLogger';
import { CameraController } from './components/CameraController';
import Navbar from './components/NavBar';
import { useResponsivePosition, useResponsiveScale } from './utility/responsiveHooks';
import BackGroundMusic from './components/BackGroundMusic';
import ShinyText  from './blocks/TextAnimations/ShinyText/ShinyText'
import { FlyingAstro } from './components/FlyingAstro';
import { AnimatePresence, motion } from 'framer-motion';
import FlyingPosters from './blocks/Components/FlyingPosters/FlyingPosters'
import ScrollStack, { ScrollStackItem } from './blocks/Components/ScrollStack/ScrollStack'
import MagicBento from './blocks/Components/MagicBento/MagicBento'
import { BabyAstro } from './components/BabyAstro';

const annotations = [
  { position: [0,2,6], lookAt: [0, 0, 0] },
  { position: [-0.2588814370121715, -1.1296287158439686, 0.10742807562495656], lookAt: [0, 0, 0] },
  { position: [-0.28560641655995583, 0.5017295994292731, 1.010602696116327], lookAt: [0, 0, 0] },
  { position: [2.51340376223797, 5.9180264480461355, 1.0169332416867762], lookAt: [0, 0, 0] },
  // { position: [0.28560641655995583, 0.5017295994292731, 1.010602696116327], lookAt: [0, 0, 0] },
];

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const userProjectsData = useSelector(state => state.userProjects.userProjects);
  const [index, setIndex] = useState(0);
  const fetchUserData = async () => {
    const userQuerySnapshot = await getDocs(collection(store, 'userInfo'));
    const userData = userQuerySnapshot.docs[0]?.data();
    const userProjectQuerySnapshot = await getDocs(collection(store, 'userProjects'));
    const userProjects = userProjectQuerySnapshot.docs[0]?.data();
    dispatch(saveUserData(userData));
    dispatch(saveUserProjects(userProjects));
  };
  useEffect(() => {
    console.log('projects', userProjectsData);
    
  }, [userProjectsData])
  useEffect(() => {
    fetchUserData();
  },[]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
const adeshSpring = useSpring({
    to: {
      x: scrollYProgress.to([0, 0.4], [0, -300]),
      opacity: scrollYProgress.to([0, 0.4], [1, 0]),
    },
  });

  const vijaySpring = useSpring({
    to: {
      scale: scrollYProgress.to([0, 0.4], [1, 3]),
      opacity: scrollYProgress.to([0, 0.4], [1, 0]),
    },
  });

  const salunkeSpring = useSpring({
    to: {
      x: scrollYProgress.to([0, 0.4], [0, 300]),
      opacity: scrollYProgress.to([0, 0.4], [1, 0]),
    },
  });

  const spaceStationScale = useResponsiveScale(0.2, 0.5);
  const spaceStationPosition = useResponsivePosition([0, -0.01, 0],[0, -0.75, 0]);
  const flyingAstroPosition = useResponsivePosition([1, -3, 0],[-3, 1.5, 0]);
  const spaceshipRef = useRef();
  const [animateBabyAstro, setAnimateBabyAstro] = useState(false);

  return (
    <section className='w-full h-screen flex flex-col justify-center items-center'>
      <Navbar targetIndex={index} setTargetIndex={index => setIndex(index)}/>
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
              <CameraController targetIndex={index} annotations={annotations} />
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
            (index === 0 || index === 2) &&
            <FlyingAstro position={flyingAstroPosition} scale={0.006}  spaceshipRef={spaceshipRef}/>
          }
             
          {/* camera controls */}
          <OrbitControls makeDefault enableDamping />
        </Suspense>
      </Canvas>
      <Loader />
      <BackGroundMusic/>
      {/* <TextType 
        text={["Welcome to my portfolio! It's great to have you here!", "Have some amazing experience!"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        className='absolute text-4xl font-bold top-44 left-8 max-w-96'
      /> */}
      {
        index === 0 && <CustomRotatingText/>
      }
      <AnimatePresence mode="wait">
        {index === 1 && (
          <motion.div
            key="shiny-text"
            className="absolute right-0"
            initial={{ opacity: 0, x: 50 }}          // starting state (hidden, moved right)
            animate={{ opacity: 1, x: 0 }}           // visible state
            exit={{ opacity: 0, x: -50 }}            // exit state (fade + move left)
            transition={{ duration: 0.8, ease: "easeInOut" }} // smooth animation
          >
            <ShinyText
              text={user.userDesc}
              className="font-bold sm:max-w-[50rem] max-w-[20rem] sm:text-3xl text-sm leading-8 sm:leading-normal"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {index === 2 &&
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/0 backdrop-blur-xs overflow-auto"
        style={{width : '100%', height : '100%'}}
      >
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
          cardData={userProjectsData.projects}
        />
      </div>
      }
      {
        index === 3 && 
        <div className="w-full h-full fixed inset-0 flex md:flex-row flex-col items-center justify-center z-40 bg-black/0 backdrop-blur-xs overflow-auto"
      >
        <div className='md:basis-1/2 basis-1 w-full h-full flex justify-center items-center'
        >
            <Canvas
            shadows
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
            className='w-100'
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />\
            <OrbitControls makeDefault enableDamping enableZoom={false}/>
            <AnimatePresence>
              <motion.group
              key="astro"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <BabyAstro scale={3} position={[animateBabyAstro ? -0.5:0.5,-2,0]} rotation={[0,0.5,0]} animate={animateBabyAstro}/>
            </motion.group>
            </AnimatePresence>
          </Canvas>
        </div>
        <AnimatePresence>
        <motion.div className='md:basis-1/2 basis-1 contact-form-container p-3'
        initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h1 className='text-white font-bold text-3xl mb-2'>Quick Contact Form</h1>
          <div className='contact-form w-full'>
              <form action="" className='flex flex-row flex-wrap'
              onFocus={() => setAnimateBabyAstro(true)}
              onBlur={() => setAnimateBabyAstro(false)}
              onSubmit={e => e.preventDefault()}
              >
                <div className="md:basis-1/2 basis-full md:pr-2">
                  <div className="mt-2">
                    <div className="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className="block min-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-500 placeholder:text-white focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:basis-1/2 basis-full">
                  <div className="mt-2">
                    <div className="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        className="block min-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-500 placeholder:text-white focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:basis-1/2 basis-full md:pr-2">
                  <div className="mt-2">
                    <div className="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Your Phone"
                        className="block min-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-500 placeholder:text-white focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:basis-1/2 basis-full">
                  <div className="mt-2">
                    <div className="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="block min-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-500 placeholder:text-white focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="basis-full">
                  <div className="mt-2">
                    <div className="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[textarea:focus-within]:outline-2 has-[textarea:focus-within]:-outline-offset-2 has-[textarea:focus-within]:outline-indigo-500">
                      <textarea
                        className="w-full block min-w-0 grow  py-1.5 pr-3 pl-1 text-base text-gray-500 placeholder:text-white focus:outline-none sm:text-sm/6"
                        id='message'
                        name='message'
                        placeholder='Your Message...'
                        rows={10}
                      />
                    </div>
                  </div>
                </div>
                <div className="basis-full">
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center rounded-md px-4 py-2 text-base sm:text-sm/6
                                bg-transparent text-gray-300 border border-gray-600
                                outline-1 -outline-offset-1 outline-gray-600
                                hover:bg-indigo-600 hover:text-white
                                focus:outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500
                                transition-all duration-200 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
          </div>
        </motion.div>
        </AnimatePresence>
      </div>
      }
    </section>
  )
}

export default App
