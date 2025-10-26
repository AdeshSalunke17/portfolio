import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";

const annotations = [
  { position: [0,2,6], lookAt: [0, 0, 0], pathname : '/' },
  { position: [-0.2588814370121715, -1.1296287158439686, 0.10742807562495656], lookAt: [0, 0, 0], pathname : '/about' },
  { position: [-0.28560641655995583, 0.5017295994292731, 1.010602696116327], lookAt: [0, 0, 0], pathname : '/projects' },
  { position: [2.51340376223797, 5.9180264480461355, 1.0169332416867762], lookAt: [0, 0, 0], pathname : '/contact' },
  // { position: [0.28560641655995583, 0.5017295994292731, 1.010602696116327], lookAt: [0, 0, 0] },
];

export function CameraController() {
  const { camera } = useThree();
  const {pathname} = useLocation();
  useEffect(() => {
    // if (pathname === '/') return;
    const { position, lookAt } = annotations.find(ref => ref.pathname === pathname);
    const targetPos = new THREE.Vector3(...position);
    const lookAtPos = new THREE.Vector3(...lookAt);

    // Smooth animation
    const duration = 1000; // 1 second
    const startPos = camera.position.clone();
    const startTime = performance.now();

    function animate() {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      camera.position.lerpVectors(startPos, targetPos, t);
      camera.lookAt(lookAtPos);

      if (t < 1) requestAnimationFrame(animate);
    }

    animate();
  }, [pathname, annotations, camera]);

  return null;
}
