const getGameConfig = async () => {

  const Phaser = await import("phaser");  
  const { LoadScene } = await import("./scenes/LoadScene");
  const { MainScene } = await import("./scenes/MainScene");

  return {
    parent: "PhaserTagline",
    type: Phaser.AUTO,
    transparent: true,  
    width: 300,
    height: 300,
    input: {
      mouse: {
        preventDefaultWheel: false, // prevent scroll capture
      },
    },
    render: {
      pixelArt: true,
    },
    physics: {
      default: "arcade",
    },
    scene: [LoadScene, MainScene],
  };
};

export default getGameConfig;