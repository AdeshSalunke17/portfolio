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
import { OrbitControls, Environment, ContactShadows, Loader, Html } from '@react-three/drei'
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

const annotations = [
  { position: [0,2,6], lookAt: [0, 0, 0] },
  { position: [-0.2588814370121715, -1.1296287158439686, 0.10742807562495656], lookAt: [0, 0, 0] },
  { position: [-0.28560641655995583, 0.5017295994292731, 1.010602696116327], lookAt: [0, 0, 0] },
  { position: [-2.7278058091356105, -5.392371360017939, 1.8658527764280648], lookAt: [0, 0, 0] },
  { position: [-0.8764948499767572, -1.533313073500974, 0.5394547339374824], lookAt: [0, 0, 0] }
];

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const [index, setIndex] = useState(0);
  const fetchUserData = async () => {
    const userQuerySnapshot = await getDocs(collection(store, 'userInfo'));
    const userData = userQuerySnapshot.docs[0]?.data();
    const userProjectQuerySnapshot = await getDocs(collection(store, 'userProjects'));
    const userProjects = userProjectQuerySnapshot.docs[0]?.data();
    dispatch(saveUserData(userData));
    dispatch(saveUserProjects(userProjects));
  };
  // useEffect(() => {
  //   console.log('user', user);
    
  // }, [user])
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
             <FlyingAstro position={flyingAstroPosition} scale={0.006}  spaceshipRef={spaceshipRef}/>
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
    </section>
  )
}

export default App
