import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export function CameraController({ targetIndex, annotations }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!annotations[targetIndex]) return;

    const { position, lookAt } = annotations[targetIndex];
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
  }, [targetIndex, annotations, camera]);

  return null;
}
