// hooks/useDimensions.js
import { useState, useEffect } from 'react';

export function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    // Callback for ResizeObserver
    const updateDimensions = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        });
      }
    };

    // Observe changes
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(ref.current);

    // Fire off once so we get an initial size
    updateDimensions();

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return dimensions;
}