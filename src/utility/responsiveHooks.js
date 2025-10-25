import { useState, useEffect, useMemo } from "react";

export function useResponsiveScale(smallScale, defaultScale) {
  const [scale, setScale] = useState(defaultScale);

  // Memoize the input values to avoid triggering useEffect on each render
  const smallScaleMemo = useMemo(() => smallScale, [smallScale]);
  const defaultScaleMemo = useMemo(() => defaultScale, [defaultScale]);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 768) {
        setScale(smallScaleMemo);
      } else {
        setScale(defaultScaleMemo);
      }
    };

    updateScale(); // run on mount
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [smallScaleMemo, defaultScaleMemo]);

  return scale;
}

export function useResponsivePosition(smallPosition, defaultPosition) {
  const [position, setPosition] = useState(defaultPosition);

  const smallPosMemo = useMemo(() => smallPosition, [JSON.stringify(smallPosition)]);
  const defaultPosMemo = useMemo(() => defaultPosition, [JSON.stringify(defaultPosition)]);

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth <= 768) {
        setPosition(smallPosMemo);
      } else {
        setPosition(defaultPosMemo);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [smallPosMemo, defaultPosMemo]);

  return position;
}
