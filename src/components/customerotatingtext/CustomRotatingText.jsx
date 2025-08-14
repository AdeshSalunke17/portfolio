import React from 'react'
import RotatingText from '../../blocks/TextAnimations/RotatingText/RotatingText'

const CustomRotatingText = () => {
  return (
    <p className='md:text-3xl text-3xl font-bold flex gap-2 items-center absolute text-white sm:top-24 top-48 right-10'>
        <span>Creative</span>
        <span className='bg-[#67e8f9] border border-transparent rounded-2xl text-black px-3 pt-1 pb-2 flex'>
            <RotatingText
            texts={["thinking", "coding", "ideas"]} staggerDuration={0.1} animatePresenceMode="wait" staggerFrom="last"
            rotationInterval={4000}
            />
        </span>
    </p>
  )
}

export default CustomRotatingText