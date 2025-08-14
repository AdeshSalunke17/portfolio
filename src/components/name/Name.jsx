import React from 'react'
import { useSelector } from 'react-redux';
import TrueFocus from '../../blocks/TextAnimations/TrueFocus/TrueFocus';
const Name = () => {
    const user = useSelector(state => state.user);
  return (
    user && user?.userData?.userFullName && 
    <TrueFocus
sentence={user?.userData?.userFullName?.toUpperCase()}
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}  
/>
  )
}

export default Name