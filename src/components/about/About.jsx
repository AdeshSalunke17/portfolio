import React from 'react'
import { useSelector } from 'react-redux';
import DecryptedText from '../../blocks/TextAnimations/DecryptedText/DecryptedText';
const colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]
const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `8s`,
}
const About = () => {
    const user = useSelector(state => state.user);
  return (
    <div className='max-w-[500px] mx-auto animated-gradient-text'>
        {/* <div className="gradient-overlay" style={gradientStyle}></div> */}
        {user?.userData?.userDesc && 
        <div className="text-content w-full" style={gradientStyle}>
        <DecryptedText
  text={user?.userData?.userDesc}
  animateOn="view"
  revealDirection="start"
maxIterations={10}
  speed={10}
  sequential={true}
  className='text-2xl leading-[2.5rem]'
/>
</div>}
    </div>
  )
}

export default About