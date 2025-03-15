import { Scene } from "phaser";

export class LoadScene extends Scene {
  constructor() {
    super("LoadScene");
  }
  preload() {
    this.load.image("test", "/img/interactive-placeholder.png");

    this.load.on("complete", () => {
      this.scene.start("MainScene");
    });
  }
}
