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
  
  getPoints() {
    // Calculate bounds and centers for all squares
    const squares = this.rectangles.map((rect, id) => {
      const x = rect.x;
      const y = rect.y;
      const width = rect.width;
      const height = rect.height;
      
      return {
        id,
        size: Math.max(width, height),
        bounds: [
          [x, y],
          [x + width, y],
          [x + width, y + height],
          [x, y + height]
        ],
        center: [x + width/2, y + height/2]
      };
    });

    // Find overall canvas boundaries
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    this.rectangles.forEach(rect => {
      minX = Math.min(minX, rect.x);
      minY = Math.min(minY, rect.y);
      maxX = Math.max(maxX, rect.x + rect.width);
      maxY = Math.max(maxY, rect.y + rect.height);
    });

    // For golden ratio, there's typically uncovered space
    // as the rectangles form a spiral pattern that doesn't fill perfectly
    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;
    
    // Identify the area that's not covered by squares
    // This is a simplified approach that finds a bounding box
    return {
      squares,
      uncovered: {
        bounds: [
          [minX, minY],
          [maxX, minY],
          [maxX, maxY],
          [minX, maxY]
        ],
        center: [centerX, centerY]
      }
    };
  }
  
  update(width, height) {
    this.generate(width, height);
  }
  
  debug() {
    // Clear any previous debug markers
    if (this.debugMarkers) {
      this.debugMarkers.forEach(marker => marker.destroy());
    }
    this.debugMarkers = [];
    
    // Get all the points
    const points = this.getPoints();
    
    // Draw markers for square bounds and centers
    points.squares.forEach(square => {
      // Draw square bounds (corner points)
      square.bounds.forEach(coord => {
        const marker = this.scene.add.rectangle(
          coord[0], 
          coord[1], 
          2, 
          2, 
          0x00FF00
        );
        marker.setDepth(1000); // Ensure it's above other elements
        this.debugMarkers.push(marker);
      });
      
      // Draw square center
      const centerMarker = this.scene.add.rectangle(
        square.center[0], 
        square.center[1], 
        4, 
        4, 
        0xFF0000
      );
      centerMarker.setDepth(1000);
      this.debugMarkers.push(centerMarker);
    });
    
    // Draw uncovered area bounds and center
    points.uncovered.bounds.forEach(coord => {
      const marker = this.scene.add.rectangle(
        coord[0], 
        coord[1], 
        2, 
        2, 
        0x00FFFF
      );
      marker.setDepth(1000);
      this.debugMarkers.push(marker);
    });
    
    // Draw uncovered area center 
    const uncoveredCenterMarker = this.scene.add.rectangle(
      points.uncovered.center[0], 
      points.uncovered.center[1], 
      4, 
      4, 
      0xFF00FF
    );
    uncoveredCenterMarker.setDepth(1000);
    this.debugMarkers.push(uncoveredCenterMarker);
    
    console.log("Debug markers added:", this.debugMarkers.length);
    console.log("Points data:", points);
  }
}

export default GoldenRatioGenerator;