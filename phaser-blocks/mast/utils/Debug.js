export class Debug {
  constructor(scene) {
    this.scene = scene;
    this.elements = {};
    this.scrollData = {
      globalScrollY: 0,
      isVisible: true, 
      distanceFromTop: 0,
      percentVisible: 1
    };
    this.mousePosition = { x: 0, y: 0 };
    
    // Add mouse move event listener to track mouse position
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  handleMouseMove(event) {
    // Store mouse position relative to browser window
    this.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    
    // Update mouse position text if it exists
    if (this.elements.mouseText) {
      this.elements.mouseText.setText(`Mouse: ${this.mousePosition.x}, ${this.mousePosition.y}`);
    }
  }

  create(width, height) {
    // Create size text display
    this.elements.sizeText = this.scene.add.text(
      10, 10,
      `Container: ${width} x ${height}`,
      { color: '#000', fontSize: '16px' }
    );
    this.elements.sizeText.setDepth(1000); // High depth to ensure visibility

    // Create scroll position text display
    this.elements.scrollText = this.scene.add.text(
      10, 30,
      `Scroll: ${Math.round(this.scrollData.globalScrollY)}px`,
      { color: '#000', fontSize: '16px' }
    );
    this.elements.scrollText.setDepth(1000);
    
    // Add visibility indicator
    this.elements.visibilityText = this.scene.add.text(
      10, 50,
      `Visible: ${this.scrollData.isVisible ? 'Yes' : 'No'}`,
      { color: '#000', fontSize: '16px' }
    );
    this.elements.visibilityText.setDepth(1000);
    
    // Add mouse position text display
    this.elements.mouseText = this.scene.add.text(
      10, 70,
      `Mouse: ${this.mousePosition.x}, ${this.mousePosition.y}`,
      { color: '#000', fontSize: '16px' }
    );
    this.elements.mouseText.setDepth(1000);

    // Create corner squares
    this.elements.topLeft = this.scene.add.rectangle(0, 0, 5, 5, 0x00ff00);
    this.elements.topRight = this.scene.add.rectangle(width, 0, 5, 5, 0x00ff00);
    this.elements.bottomLeft = this.scene.add.rectangle(0, height, 5, 5, 0x00ff00);
    this.elements.bottomRight = this.scene.add.rectangle(width, height, 5, 5, 0x00ff00);
    
    // Set origin to corners (default is center)
    this.elements.topLeft.setOrigin(0, 0);
    this.elements.topRight.setOrigin(1, 0);
    this.elements.bottomLeft.setOrigin(0, 1);
    this.elements.bottomRight.setOrigin(1, 1);
    
    // Set depth to ensure visibility
    Object.values(this.elements).forEach(element => {
      if (element && element.setDepth) {
        element.setDepth(1000);
      }
    });
  }
  
  handleResize(width, height) {
    if (this.elements.sizeText) {
      this.elements.sizeText.setText(`Container: ${width} x ${height}`);
    }
    
    if (this.elements.topRight) {
      this.elements.topRight.x = width;
    }
    
    if (this.elements.bottomLeft) {
      this.elements.bottomLeft.y = height;
    }
    
    if (this.elements.bottomRight) {
      this.elements.bottomRight.x = width;
      this.elements.bottomRight.y = height;
    }
  }
  
  handleScroll(scrollData) {
    // Handle either simple number or complex scroll data object
    if (typeof scrollData === 'number') {
      this.scrollData = { 
        globalScrollY: scrollData,
        isVisible: true,
        distanceFromTop: 0,
        percentVisible: 1
      };
    } else {
      this.scrollData = scrollData;
    }
    
    // Update scroll text
    if (this.elements.scrollText) {
      this.elements.scrollText.setText(`Scroll: ${Math.round(this.scrollData.globalScrollY)}px`);
    }
    
    // Update visibility text if it exists
    if (this.elements.visibilityText && this.scrollData.isVisible !== undefined) {
      this.elements.visibilityText.setText(`Visible: ${this.scrollData.isVisible ? 'Yes' : 'No'} (${Math.round(this.scrollData.percentVisible * 100)}%)`);
    }
  }
  
  // Cleanup method to remove event listeners when needed
  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
  }
}

export default Debug;