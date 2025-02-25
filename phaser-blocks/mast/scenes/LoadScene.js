import { Scene } from 'phaser';

export class LoadScene extends Scene {
  preload() {
    this.load.image('test', '/img/interactive-placeholder.png');
  }

  create() {
    // Get initial size
    const { width, height } = this.scale.gameSize;

    this.image = this.add.image(width / 2, height / 2, 'test');
    this.image.setScale(0.5)

    this.sizeText = this.add.text(
      10, 10,
      `Container: ${width} x ${height}`,
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

    // Listen for resize events and adjust elements dynamically
    this.scale.on('resize', (gameSize) => {
      // console.log("Game resized to:", gameSize.width, gameSize.height);

      // Move the image to the center
      // this.image.setPosition(gameSize.width / 2, gameSize.height / 2);

      // Update the text label
      this.sizeText.setText(`Container: ${gameSize.width} x ${gameSize.height}`);
      
      // Update corner square positions
      this.topRight.x = gameSize.width;
      this.bottomLeft.y = gameSize.height;
      this.bottomRight.x = gameSize.width;
      this.bottomRight.y = gameSize.height;
    });
  }
}