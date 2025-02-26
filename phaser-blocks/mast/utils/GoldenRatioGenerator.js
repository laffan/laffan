// phaser-blocks/utils/GoldenRatioGenerator.js

export class GoldenRatioGenerator {
  constructor(scene) {
    this.scene = scene;
    this.rectangles = [];
    this.iterations = 7;
  }

  generate(width, height) {
    this.clearRectangles();
    
    const isVertical = height >= width;
    let area = { x: 0, y: 0, width, height };
    
    if (isVertical) {
      this.createSpiral(area, true);
    } else {
      this.createSpiral(area, false);
    }
  }
  
  clearRectangles() {
    this.rectangles.forEach(rect => {
      if (rect) rect.destroy();
    });
    this.rectangles = [];
  }
  
  createSpiral(area, isVertical) {
    // Define the sequence of moves for vertical and horizontal patterns
    const baseMovesVertical = ['bottom', 'left', 'top', 'right'];
    const baseMovesHorizontal = ['left', 'top', 'right', 'bottom'];
    
    // Dynamically build the moves array based on number of iterations
    let moves = [];
    if (isVertical) {
      // For vertical, repeat the pattern: bottom, left, top, right, ...
      for (let i = 0; i < this.iterations; i++) {
        if (i < this.iterations - 1) {
          moves.push(baseMovesVertical[i % 4]);
        } else {
          // Last iteration fills remaining area
          moves.push('all');
        }
      }
    } else {
      // For horizontal, repeat the pattern: left, top, right, bottom, ...
      for (let i = 0; i < this.iterations; i++) {
        if (i < this.iterations - 1) {
          moves.push(baseMovesHorizontal[i % 4]);
        } else {
          // Last iteration fills remaining area
          moves.push('all');
        }
      }
    }
    
    let currentArea = {...area};
    
    for (let i = 0; i < this.iterations; i++) {
      // Calculate color based on iteration (from black to white)
      const colorValue = Math.floor(255 * (i / (this.iterations - 1)));
      const color = Phaser.Display.Color.GetColor(colorValue, colorValue, colorValue);
      const move = moves[i];
      
      // Create rectangle based on current move
      let rect;
      
      if (move === 'bottom') {
        const squareSize = Math.min(currentArea.width, currentArea.height);
        rect = this.scene.add.rectangle(
          currentArea.x,
          currentArea.y + currentArea.height - squareSize,
          squareSize,
          squareSize,
          color
        );
        rect.setOrigin(0, 0);
        rect.setDepth(i);
        this.rectangles.push(rect);
        
        // Update area (above the square)
        currentArea = {
          x: currentArea.x,
          y: currentArea.y,
          width: currentArea.width,
          height: currentArea.height - squareSize
        };
      } 
      else if (move === 'left') {
        const squareSize = Math.min(currentArea.width, currentArea.height);
        rect = this.scene.add.rectangle(
          currentArea.x,
          currentArea.y,
          squareSize,
          squareSize,
          color
        );
        rect.setOrigin(0, 0);
        rect.setDepth(i);
        this.rectangles.push(rect);
        
        // Update area (to the right of the square)
        currentArea = {
          x: currentArea.x + squareSize,
          y: currentArea.y,
          width: currentArea.width - squareSize,
          height: currentArea.height
        };
      } 
      else if (move === 'top') {
        const squareSize = Math.min(currentArea.width, currentArea.height);
        rect = this.scene.add.rectangle(
          currentArea.x,
          currentArea.y,
          currentArea.width,
          squareSize,
          color
        );
        rect.setOrigin(0, 0);
        rect.setDepth(i);
        this.rectangles.push(rect);
        
        // Update area (below the square)
        currentArea = {
          x: currentArea.x,
          y: currentArea.y + squareSize,
          width: currentArea.width,
          height: currentArea.height - squareSize
        };
      } 
      else if (move === 'right') {
        const squareSize = Math.min(currentArea.width, currentArea.height);
        rect = this.scene.add.rectangle(
          currentArea.x + currentArea.width - squareSize,
          currentArea.y,
          squareSize,
          currentArea.height,
          color
        );
        rect.setOrigin(0, 0);
        rect.setDepth(i);
        this.rectangles.push(rect);
        
        // Update area (to the left of the square)
        currentArea = {
          x: currentArea.x,
          y: currentArea.y,
          width: currentArea.width - squareSize,
          height: currentArea.height
        };
      } 
      else if (move === 'all') {
        // Last iteration - fill remaining area
        rect = this.scene.add.rectangle(
          currentArea.x,
          currentArea.y,
          currentArea.width,
          currentArea.height,
          color
        );
        rect.setOrigin(0, 0);
        rect.setDepth(i);
        this.rectangles.push(rect);
      }
    }
  }
  
  update(width, height) {
    this.generate(width, height);
  }
}

export default GoldenRatioGenerator;