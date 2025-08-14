import { useState, useEffect } from "react";

export function useResponsiveScale(smallScale, defaultScale) {
  const [scale, setScale] = useState(defaultScale);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 768) {
        setScale(smallScale);
      } else {
        setScale(defaultScale);
      }
    };

    updateScale(); // run on mount
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [smallScale, defaultScale]);

  return scale;
}

export function useResponsivePosition(smallPosition, defaultPosition) {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth <= 768) {
        setPosition(smallPosition);
      } else {
        setPosition(defaultPosition);
      }
    };

    updatePosition(); // run on mount
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [smallPosition, defaultPosition]);

  return position;
}
