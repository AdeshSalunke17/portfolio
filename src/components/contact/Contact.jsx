import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { BabyAstro } from '../BabyAstro'
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { store } from '../../config/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
  import { Bounce, ToastContainer, toast } from 'react-toastify';

const Contact = () => {
      const [animateBabyAstro, setAnimateBabyAstro] = useState(false);
      const userName = useRef();
      const userEmail = useRef();
      const userPhone = useRef();
      const userAddress = useRef();
      const userMessage = useRef();

      const handleSubmit =async e => {
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(store, "contacted_users"), {
            name : userName.current.value,
            email : userEmail.current.value,
            message : userMessage.current.value,
            phone : userPhone.current.value,
            address : userAddress.current.value
          });
          if(docRef.id) {
            toast.success('data saved!', {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
              userName.current.value = '';
              userEmail.current.value = '';
              userMessage.current.value = '';
              userPhone.current.value = '';
              userAddress.current.value = '';
          } else {
            throw new Error();
          }
        } catch (error) {
          toast.error('Unable to save data!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
            console.log('error occured while storing data', error);
            
        }
      }

  return (
    <div className="w-full h-full fixed inset-0 flex md:flex-row flex-col items-center justify-center z-40 bg-black/0 backdrop-blur-xs overflow-auto"
      >
        <ToastContainer />
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
              onSubmit={handleSubmit}
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
                        ref={userName}
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
                        ref={userEmail}
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
                        ref={userPhone}
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
                        ref={userAddress}
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
                        ref={userMessage}
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
  )
}

export default Contact