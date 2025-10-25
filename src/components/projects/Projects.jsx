import React from 'react'
import MagicBento from '../../blocks/Components/MagicBento/MagicBento'
import { useSelector } from 'react-redux';

const Projects = () => {
      const userProjectsData = useSelector(state => state.userProjects.userProjects);
  return (
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
  )
}

export default Projects