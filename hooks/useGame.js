import { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';

export function useGame(config, containerRef) {
  const [game, setGame] = useState(null);
  const gameRef = useRef(null);

  useEffect(() => {
    // Initialize the Phaser game instance if it doesn't exist
    if (!gameRef.current && containerRef.current) {
      const newGame = new Phaser.Game({
        ...config,
        parent: containerRef.current,
      });
      gameRef.current = newGame;
      setGame(newGame);
    }

    // Cleanup function to destroy the Phaser game instance on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
        setGame(null);
      }
    };
  }, [config, containerRef]);

  // Handle resizing without reinitializing the game
  useEffect(() => {
    if (gameRef.current && config.width && config.height) {
      gameRef.current.scale.resize(config.width, config.height);
    }
  }, [config.width, config.height]);

  return game;
}
