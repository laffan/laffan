import { Scene } from 'phaser';

export class LoadScene extends Scene {
  preload() {
    this.load.image('test', '/img/lookbook.png');

    this.load.on('complete', () => {
      this.createScene(); 
    });
  }

  createScene() {
    this.add.image(100, 100, 'test');

    const { width, height } = this.scale.gameSize;
    const sizeText = this.add.text(
      10,
      10,
      `Container: ${width} x ${height}`, 
      {
        color: '#000',
        fontSize: '16px',
      }
    );

    // Listen for any future resize events
    this.scale.on('resize', (gameSize) => {
      // Update the text each time the container is resized
      sizeText.setText(`Container: ${gameSize.width} x ${gameSize.height}`);
    });
  }
}