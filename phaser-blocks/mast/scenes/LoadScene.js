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

    // Listen for resize events and adjust elements dynamically
    this.scale.on('resize', (gameSize) => {
      console.log("Game resized to:", gameSize.width, gameSize.height);

      // Move the image to the center
      // this.image.setPosition(gameSize.width / 2, gameSize.height / 2);

      // Update the text label
      this.sizeText.setText(`Container: ${gameSize.width} x ${gameSize.height}`);
    });
  }
}
