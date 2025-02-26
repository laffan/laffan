// hooks/usePhaserSingleton.js
import { useState, useEffect } from 'react';
import Phaser from 'phaser';

// We'll use a Map to store multiple game instances
let phaserInstances = new Map();
// We'll use this to track if Phaser has been loaded
let isPhaserLoaded = false;

export function usePhaserSingleton(instanceId = 'default') {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    // Mark Phaser as loaded (only needs to happen once across all instances)
    isPhaserLoaded = true;
    
    // Create a new instance if it doesn't exist for this ID
    if (!phaserInstances.has(instanceId)) {
      const newInstance = {
        id: instanceId,
        isInitialized: false,
        game: null,
        currentConfig: null,
        scrollPosition: 0,
        initialize: (config, parentElement) => {
          // Save the config for potential recreations
          newInstance.currentConfig = config;
          
          if (newInstance.isInitialized && newInstance.game) {
            // If already initialized, just resize instead of destroying
            newInstance.resize(config.width, config.height);
            return newInstance.game;
          }

          // Create the new Phaser game with provided config and parent
          newInstance.game = new Phaser.Game({
            ...config,
            parent: parentElement,
          });
          
          newInstance.isInitialized = true;
          return newInstance.game;
        },
        resize: (width, height) => {
          if (newInstance.isInitialized && newInstance.game) {
            // Just resize the scale without destroying the game
            newInstance.game.scale.resize(width, height);
            
            // Notify all active scenes about the resize
            newInstance.game.scene.scenes.forEach(scene => {
              if (scene.handleResize && typeof scene.handleResize === 'function') {
                scene.handleResize(width, height);
              }
            });
          }
        },
        updateScrollPosition: (scrollPos) => {
          newInstance.scrollPosition = scrollPos;
          
          // Notify all active scenes about the scroll update
          if (newInstance.isInitialized && newInstance.game) {
            newInstance.game.scene.scenes.forEach(scene => {
              if (scene.handleScroll && typeof scene.handleScroll === 'function') {
                scene.handleScroll(scrollPos);
              }
            });
          }
        },
        destroy: () => {
          if (newInstance.isInitialized && newInstance.game) {
            newInstance.game.destroy(true);
            newInstance.game = null;
            newInstance.isInitialized = false;
          }
        }
      };
      
      phaserInstances.set(instanceId, newInstance);
    }

    const instanceToUse = phaserInstances.get(instanceId);
    setInstance(instanceToUse);

    // Cleanup function - only remove the instance if component using it is unmounted
    return () => {
      // We won't automatically destroy here, as other components might be using it
      // To fully clean up, call the destroy method explicitly
    };
  }, [instanceId]);

  return instance;
}

// Helper function to check if Phaser is already loaded
export function isPhaserAlreadyLoaded() {
  return isPhaserLoaded;
}

// Helper to get all active Phaser instances
export function getAllPhaserInstances() {
  return phaserInstances;
}

// Helper to destroy a specific instance or all instances
export function destroyPhaserInstance(instanceId = null) {
  if (instanceId) {
    const instance = phaserInstances.get(instanceId);
    if (instance) {
      instance.destroy();
      phaserInstances.delete(instanceId);
    }
  } else {
    // Destroy all instances
    phaserInstances.forEach(instance => {
      instance.destroy();
    });
    phaserInstances.clear();
  }
}