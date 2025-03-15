// phaser-blocks/scenes/MainScene.js
import { Scene } from 'phaser';
import GoldenRatioGenerator from '../utils/GoldenRatioGenerator';
import Debug from '../utils/Debug';

export class MainScene extends Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    // Get initial size
    const { width, height } = this.scale.gameSize;
    
    // Initialize the debug display
    // this.debug = new Debug(this);
    // this.debug.create(width, height);
    
    // Initialize the golden ratio generator
    // this.goldenRatioGenerator = new GoldenRatioGenerator(this);
    // this.goldenRatioGenerator.generate(width, height);

    this.scale.on('resize', (gameSize) => {

      // Update debug display
      // this.debug.handleResize(gameSize.width, gameSize.height);
      
      // this.goldenRatioGenerator.update(gameSize.width, gameSize.height);
    });
  }
  
  handleScroll(scrollData) {
    // if (this.debug) {
    //   this.debug.handleScroll(scrollData);
    // }
  }
  
  handleResize(width, height) {
    // We're relying on the scale event listener for resize handling
  }
}

export default MainScene;