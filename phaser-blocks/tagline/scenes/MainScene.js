// phaser-blocks/scenes/MainScene.js
import { Scene } from 'phaser';

// Global variable for grid size
// Global variable for grid size
const GRID_SIZE = 27;

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    const { width, height } = this.scale;
    this.squareSize = width / 10;
    this.cols = 10;
    this.rows = Math.floor(height / this.squareSize);

    this.graphics = this.add.graphics();
    this.drawGrid(); // Initial grid rendering

    // Set an event to update a random square every x seconds
    this.time.addEvent({
      delay: 2000,
      callback: this.updateRandomSquare,
      callbackScope: this,
      loop: true,
    });
  }

  drawGrid() {
    this.grid = []; // Store grid colors
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        const gray = Phaser.Math.Between(90, 230);
        const color = (gray << 16) | (gray << 8) | gray;
        this.grid[row][col] = color;

        this.graphics.fillStyle(color, 1);
        this.graphics.fillRect(col * this.squareSize, row * this.squareSize, this.squareSize, this.squareSize);
      }
    }
  }

  updateRandomSquare() {
    // Pick a random row and column
    const randomRow = Phaser.Math.Between(0, this.rows - 1);
    const randomCol = Phaser.Math.Between(0, this.cols - 1);

    // Generate a new random gray color
    const gray = Phaser.Math.Between(90, 230);
    const newColor = (gray << 16) | (gray << 8) | gray;

    // Update the stored grid color
    this.grid[randomRow][randomCol] = newColor;

    // Redraw the new square
    this.graphics.fillStyle(newColor, 1);
    this.graphics.fillRect(randomCol * this.squareSize, randomRow * this.squareSize, this.squareSize, this.squareSize);
  }
}

export default MainScene;