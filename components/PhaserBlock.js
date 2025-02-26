// components/PhaserBlock.js
import { useRef, useEffect, useState } from "react";
import { usePhaserSingleton } from "../hooks/usePhaserSingleton";
import { useDimensions } from "../hooks/useDimensions";

function PhaserBlock({ gameConfig, instanceId = 'default' }) {
  const containerRef = useRef();
  const { width, height } = useDimensions(containerRef);
  const phaserInstance = usePhaserSingleton(instanceId);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Store the initial config for reference
  const configRef = useRef(null);

  // Setup Phaser instance
  useEffect(() => {
    if (!gameConfig || !phaserInstance || !containerRef.current) return;

    // Store the original config for reference
    if (!configRef.current) {
      configRef.current = gameConfig;
    }

    // Update dimensions in the game config
    const updatedConfig = {
      ...gameConfig,
      width: width || 300, // Start w/default
      height: height || 300, // Start w/default
    };

    // Initialize the game only once for this instance
    if (!isInitialized) {
      phaserInstance.initialize(updatedConfig, containerRef.current);
      setIsInitialized(true);
    } else if (width && height) {
      // Just resize if already initialized and dimensions are valid
      phaserInstance.resize(width, height);
    }

    // Cleanup on component unmount
    return () => {
      // Don't destroy the instance here, just update our local state
      setIsInitialized(false);
    };
  }, [gameConfig, width, height, phaserInstance, instanceId]);

  // Setup scroll listener
  useEffect(() => {
    if (!phaserInstance) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate element-specific scroll values
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementVisibility = {
          isVisible: rect.top < window.innerHeight && rect.bottom > 0,
          distanceFromTop: rect.top,
          percentVisible: Math.min(1, Math.max(0, 
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          )),
          globalScrollY: scrollPosition
        };
        
        // Update both global scroll and element-specific scroll data
        phaserInstance.updateScrollPosition(elementVisibility);
      } else {
        // Fallback to just global scroll if no element ref
        phaserInstance.updateScrollPosition({ globalScrollY: scrollPosition });
      }
    };

    // Initial scroll position
    handleScroll();

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [phaserInstance]);

  return (
    <div
      ref={containerRef}
      className="PhaserBlock"
      style={{
        display: "block",
        width: "100%",
        height: "100%"
      }}
      data-phaser-instance={instanceId}
    ></div>
  );
}

export default PhaserBlock;