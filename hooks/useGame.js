import { useState, useEffect } from "react";
import { Game } from "phaser";

export function useGame(config, containerRef) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!config || !containerRef.current) return;

    if (!game) {
      console.log("Initializing Phaser with config:", config);
      const newGame = new Game({
        ...config,
        parent: containerRef.current,
      });
      setGame(newGame);
    } else {
      // **Resize the existing game instead of re-initializing**
      console.log("Resizing existing Phaser game to:", config.width, config.height);
      game.scale.resize(config.width, config.height);
    }
  }, [config.width, config.height]); // Only update when size changes

  return game;
}
