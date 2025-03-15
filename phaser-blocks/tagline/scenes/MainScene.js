
export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.whiteSquares = []; 
  }

  create() {
    const { width, height } = this.scale;
    this.squareSize = width / 10;
    this.cols = 10;
    this.rows = Math.floor(height / this.squareSize);

    this.graphics = this.add.graphics();
    this.drawGrid(); 

    this.time.addEvent({
      delay: 2000,
      callback: this.updateRandomSquare,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 5000,
      callback: this.highlightThenWhiteSquare,
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

    // Check if this square is in our white squares list - if so, skip it
    const key = `${randomRow},${randomCol}`;
    if (this.whiteSquares.includes(key)) {
      return; // Skip updating if it's a white square
    }

    // Generate a new random gray color
    const gray = Phaser.Math.Between(90, 230);
    const newColor = (gray << 16) | (gray << 8) | gray;

    // Update the stored grid color
    this.grid[randomRow][randomCol] = newColor;

    // Redraw the new square
    this.graphics.fillStyle(newColor, 1);
    this.graphics.fillRect(randomCol * this.squareSize, randomRow * this.squareSize, this.squareSize, this.squareSize);
  }

  highlightThenWhiteSquare() {
    // Find a square that isn't already white
    let randomRow, randomCol, key;
    let attempts = 0;
    const maxAttempts = 20; // Prevent infinite loop if all squares become white
    
    do {
      randomRow = Phaser.Math.Between(0, this.rows - 1);
      randomCol = Phaser.Math.Between(0, this.cols - 1);
      key = `${randomRow},${randomCol}`;
      attempts++;
    } while (this.whiteSquares.includes(key) && attempts < maxAttempts);
    
    // If we've already turned all squares white, just return
    if (attempts >= maxAttempts && this.whiteSquares.includes(key)) {
      return;
    }

    // Add to white squares list
    this.whiteSquares.push(key);
    
    // Change to red  (0xc80000)
    this.graphics.fillStyle(0xc80000, 1);
    this.graphics.fillRect(randomCol * this.squareSize, randomRow * this.squareSize, this.squareSize, this.squareSize);
    
    // change to white after 3 seconds
    this.time.delayedCall(1000, () => {
      this.graphics.fillStyle(0xffffff, 1); // White color
      this.graphics.fillRect(randomCol * this.squareSize, randomRow * this.squareSize, this.squareSize, this.squareSize);
      this.grid[randomRow][randomCol] = 0xffffff; // Update the grid array
    });
  }
}

export default MainScene;