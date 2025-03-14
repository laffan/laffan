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
    this.goldenRatioGenerator = new GoldenRatioGenerator(this);
    this.goldenRatioGenerator.generate(width, height);
    console.log( this.goldenRatioGenerator.getPoints());
    this.goldenRatioGenerator.debug()

    this.scale.on('resize', (gameSize) => {

      // Update debug display
      // this.debug.handleResize(gameSize.width, gameSize.height);
      
      this.goldenRatioGenerator.update(gameSize.width, gameSize.height);
    // create red circle at the center of the screen
    const { width, height } = this.scale.gameSize;
    const centerX = width / 2;
    const centerY = height / 2;
    const redCircle = this.add.circle(centerX, centerY, 50, 0xff0000);

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