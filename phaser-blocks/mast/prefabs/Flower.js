import Phaser from "phaser";

class Flower extends Phaser.GameObjects.Container {
  constructor(scene, x, y, color) {
    super(scene, x, y);

    // Store references
    this.scene = scene;
    this.color = color || 0xfacade; // Use provided color or default

    // Add the container to the scene first
    scene.add.existing(this);

    console.log("Creating flower at", x, y, "with color", this.color);

    // Define the flower pattern
    const shape = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];

    // Calculate offset to center the flower
    const centerOffset = this.scene.gridSize;

    // Draw each cell in the pattern
    for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
      for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
        // Only draw cells marked as 1 in the pattern
        if (shape[rowIndex][colIndex] === 1) {
          // Calculate position within the container
          const cellX = (rowIndex - 1) * this.scene.gridSize;
          const cellY = (colIndex - 1) * this.scene.gridSize;
          
          // Create rectangle game object
          const rect = new Phaser.GameObjects.Rectangle(
            scene,
            cellX,
            cellY,
            this.scene.gridSize,
            this.scene.gridSize,
            this.color
          );
          
          // Add the rectangle to the container
          this.add(rect);
        }
      }
    }
  }
}

export default Flower;