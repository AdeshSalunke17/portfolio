import React from 'react'
import { useSelector } from 'react-redux';
import DecryptedText from '../../blocks/TextAnimations/DecryptedText/DecryptedText';
import { AnimatePresence, motion } from 'framer-motion';
import ShinyText from '../../blocks/TextAnimations/ShinyText/ShinyText';
const colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]
const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `8s`,
}
const About = () => {
    const user = useSelector(state => state.user);
    
  return (
    <AnimatePresence mode="wait"> 
            <motion.div
            key="shiny-text"
            className="absolute right-0"
            initial={{ opacity: 0, x: 50 }}          // starting state (hidden, moved right)
            animate={{ opacity: 1, x: 0 }}           // visible state
            exit={{ opacity: 0, x: -50 }}            // exit state (fade + move left)
            transition={{ duration: 0.8, ease: "easeInOut" }} // smooth animation
          >
            <ShinyText
              text={user.userData.userDesc}
              className="font-bold sm:max-w-[50rem] max-w-[20rem] sm:text-3xl text-sm leading-8 sm:leading-normal"
            />
          </motion.div>
       </AnimatePresence>
  )
}

export default About