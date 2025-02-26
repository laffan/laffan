// phaser-blocks/scenes/MainScene.js
import { Scene } from 'phaser';

export class MainScene extends Scene {
  constructor() {
    super("MainScene");
    this.scrollData = {
      globalScrollY: 0,
      isVisible: true, 
      distanceFromTop: 0,
      percentVisible: 1
    };
  }

  create() {
    // Get initial size
    const { width, height } = this.scale.gameSize;

    this.image = this.add.image(width / 2, height / 2, 'test');
    this.image.setScale(0.5);

    // Create size text display
    this.sizeText = this.add.text(
      10, 10,
      `Container: ${width} x ${height}`,
      { color: '#000', fontSize: '16px' }
    );

    // Create scroll position text display with enhanced data
    this.scrollText = this.add.text(
      10, 30,
      `Scroll: ${Math.round(this.scrollData.globalScrollY)}px`,
      { color: '#000', fontSize: '16px' }
    );
    
    // Add visibility indicator
    this.visibilityText = this.add.text(
      10, 50,
      `Visible: ${this.scrollData.isVisible ? 'Yes' : 'No'}`,
      { color: '#000', fontSize: '16px' }
    );

    // Create corner squares
    this.topLeft = this.add.rectangle(0, 0, 5, 5, 0x00ff00);
    this.topRight = this.add.rectangle(width, 0, 5, 5, 0x00ff00);
    this.bottomLeft = this.add.rectangle(0, height, 5, 5, 0x00ff00);
    this.bottomRight = this.add.rectangle(width, height, 5, 5, 0x00ff00);
    
    // Set origin to corners (default is center)
    this.topLeft.setOrigin(0, 0);
    this.topRight.setOrigin(1, 0);
    this.bottomLeft.setOrigin(0, 1);
    this.bottomRight.setOrigin(1, 1);

    // Listen for resize events
    this.scale.on('resize', (gameSize) => {
      // Update the text label
      this.sizeText.setText(`Container: ${gameSize.width} x ${gameSize.height}`);
      
      // Update corner square positions
      this.topRight.x = gameSize.width;
      this.bottomLeft.y = gameSize.height;
      this.bottomRight.x = gameSize.width;
      this.bottomRight.y = gameSize.height;
    });
  }
  
  // This method will be called by our singleton when scroll happens
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
    if (this.scrollText) {
      this.scrollText.setText(`Scroll: ${Math.round(this.scrollData.globalScrollY)}px`);
    }
    
    // Update visibility text if it exists
    if (this.visibilityText && this.scrollData.isVisible !== undefined) {
      this.visibilityText.setText(`Visible: ${this.scrollData.isVisible ? 'Yes' : 'No'} (${Math.round(this.scrollData.percentVisible * 100)}%)`);
      console.log("Visible", this.scrollData.isVisible)
    }
  }
  
  // Handle resize if needed
  handleResize(width, height) {
    // We're relying on the scale event listener for resize handling
  }
}

export default MainScene;