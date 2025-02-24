import { useRef, useEffect, useState } from "react";
import { useGame } from "../hooks/useGame";
import { useDimensions } from "../hooks/useDimensions";

function PhaserBlock({ gameConfig }) {
  const containerRef = useRef();
  const { width, height } = useDimensions(containerRef);
  const [updatedConfig, setUpdatedConfig] = useState(gameConfig);

  useEffect(() => {
    if (!gameConfig) return;

    // Update game config dynamically without triggering a full re-render
    setUpdatedConfig((prevConfig) => ({
      ...prevConfig,
      width: width || 300, // Start w/default
      height: height || 300, // Start w/default
    }));
  }, [width, height]);

  useGame(updatedConfig, containerRef);

  return (
    <div
      ref={containerRef}
      className="PhaserBlock"
      style={{
        width: "100%",
        height: "400px", // Adjust height as needed
      }}
    ></div>
  );
}

export default PhaserBlock;
