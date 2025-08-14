import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

export function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const logCamera = () => {
      console.log("Camera position:", camera.position);
      console.log("Camera rotation:", camera.rotation);
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "p") logCamera(); // Press 'p' to print camera state
    });

    return () => window.removeEventListener("keydown", () => {});
  }, [camera]);

  return null;
}
