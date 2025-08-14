import { Html } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function BackGroundMusic() {
  const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
  const [show, setShow] = useState(false);
//   const toggleMusic = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play().catch(err => console.log("Play blocked:", err));
//     }
//     setIsPlaying(!isPlaying);
//   };

  // Optional: start music after first click anywhere
//   useEffect(() => {
//     const enablePlay = () => {
//       if (audioRef.current && !isPlaying) {
//         audioRef.current.play().catch(() => {});
//         setIsPlaying(true);
//       }
//       window.removeEventListener("click", enablePlay);
//     };
//     window.addEventListener("click", enablePlay);
//     return () => window.removeEventListener("click", enablePlay);
//   }, [isPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const playMusic = () => {
    audioRef.current = new Audio('/music/interstellar.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  const handleYes = () => {
    console.log('play');
    
    playMusic();
    setShow(false);
  };

  const handleNo = () => {
    setShow(false);
  };

  return (
        <AnimatePresence>
        {show && (
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
            >
                <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-indigo-400/40 animate-pulse">
                    <h2 className="text-2xl font-bold mb-4 text-center text-indigo-300 tracking-wider">
                    🚀 Space Journey Awaits
                    </h2>
                    <p className="text-gray-300 text-center mb-3">
                    Do you want to enable epic background music while exploring the cosmos?
                    </p>
                    <p className="text-indigo-400 text-center text-sm italic mb-6">
                    🎧 For the best experience, wear headphones.
                    </p>
                    <div className="flex justify-around">
                    <button
                        onClick={handleYes}
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg transition cursor-pointer"
                    >
                        Yes, Play It 🌌
                    </button>
                    <button
                        onClick={handleNo}
                        className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg transition cursor-pointer"
                    >
                        No, Silence ✨
                    </button>
                    </div>
                </div>
            </motion.div>
        )}
        </AnimatePresence>
  );
}
