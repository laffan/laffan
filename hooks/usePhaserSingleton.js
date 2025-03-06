// hooks/usePhaserSingleton.js - updated
import { useState, useEffect } from 'react';
import Phaser from 'phaser';
import { useRouter } from 'next/router';

// We'll use a Map to store multiple game instances
let phaserInstances = new Map();
// We'll use this to track if Phaser has been loaded
let isPhaserLoaded = false;

export function usePhaserSingleton(instanceId = 'default') {
  const [instance, setInstance] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Mark Phaser as loaded
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
            // If already initialized, destroy and recreate to ensure clean state
            newInstance.destroy();
          }

          // Create the new Phaser game with provided config and parent
          newInstance.game = new Phaser.Game({
            ...config,
            parent: parentElement,
          });
          
          newInstance.isInitialized = true;
          return newInstance.game;
        },
        // Rest of your methods remain the same
        resize: (width, height) => {
          if (newInstance.isInitialized && newInstance.game) {
            newInstance.game.scale.resize(width, height);
            
            newInstance.game.scene.scenes.forEach(scene => {
              if (scene.handleResize && typeof scene.handleResize === 'function') {
                scene.handleResize(width, height);
              }
            });
          }
        },
        updateScrollPosition: (scrollPos) => {
          newInstance.scrollPosition = scrollPos;
          
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

    // Handle Next.js route changes
    const handleRouteChangeStart = () => {
      // Mark instances for reinitialization on return
      if (phaserInstances.has(instanceId)) {
        const instance = phaserInstances.get(instanceId);
        // We'll destroy on route change but keep the instance in the Map
        instance.destroy();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [instanceId, router]);

  return instance;
}

// Export other helpers as before
export function isPhaserAlreadyLoaded() {
  return isPhaserLoaded;
}

export function getAllPhaserInstances() {
  return phaserInstances;
}

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