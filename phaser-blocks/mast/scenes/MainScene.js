// phaser-blocks/scenes/MainScene.js
import { Scene } from "phaser";
import Flower from "../prefabs/Flower";

export class MainScene extends Scene {
  constructor() {
    super("MainScene");
    this.gridSize = 27;
    this.flowers = [];
    this.flowerPositions = [];
  }

  create() {
    this.flowerSizeInCells = 3;

    // Calculate grid dimensions based on container size
    // Subtract the flower size to prevent flowers from extending beyond the edge
    this.gridWidth =
      Math.floor(this.cameras.main.width / this.gridSize) -
      (this.flowerSizeInCells - 1);
    this.gridHeight =
      Math.floor(this.cameras.main.height / this.gridSize) -
      (this.flowerSizeInCells - 1);


    // Place flowers randomly
    // Determine flower count based on screen width
    const screenWidth = this.cameras.main.width;
    let flowerCount;

    if (screenWidth < 400) {
      flowerCount = 3;
    } else if (screenWidth >= 400 && screenWidth < 1200) {
      flowerCount = 6;
    } else {
      flowerCount = 8;
    }
    // Place flowers randomly
    this.placeFlowersRandomly(flowerCount);
  }

  placeFlowersRandomly(count) {
    const flowerColor = 0xc80000;

    for (let i = 0; i < count; i++) {
      let position = this.findValidFlowerPosition();

      if (position) {
        // Create a new flower at the valid position
        const gridX = position.x;
        const gridY = position.y;

        // Convert grid positions to pixel positions (add offset to center in grid cell)
        const pixelX = gridX * this.gridSize + this.gridSize / 2;
        const pixelY = gridY * this.gridSize + this.gridSize / 2;

        // Create the flower with the red color
        const flower = new Flower(this, pixelX, pixelY, flowerColor);

        // Store the flower and its grid position
        this.flowers.push(flower);
        this.flowerPositions.push(position);

      } else {
        console.warn(`Could not find valid position for flower ${i + 1}`);
        break;
      }
    }
  }

  findValidFlowerPosition() {
    // Maximum attempts to find a valid position
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      // Add +1 as a safety margin
      const gridX = Math.floor(Math.random() * (this.gridWidth - 2)) + 1;
      const gridY = Math.floor(Math.random() * (this.gridHeight - 2)) + 1;

      // Check if this position is valid
      if (this.isValidFlowerPosition(gridX, gridY)) {
        return { x: gridX, y: gridY };
      }

      attempts++;
    }

    return null; // Couldn't find a valid position
  }

  isValidFlowerPosition(x, y) {
    for (const position of this.flowerPositions) {
      const distance = Math.abs(position.x - x) + Math.abs(position.y - y);

      if (distance < 6) {
        // at least 6 spaces away from another flower.
        return false;
      }
    }

    return true; // Position is valid
  }
}

export default MainScene;
