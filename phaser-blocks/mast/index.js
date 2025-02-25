const getGameConfig = async () => {

  const Phaser = await import("phaser");  
  const { LoadScene } = await import("./scenes/LoadScene");
  const { MainScene } = await import("./scenes/MainScene");

  return {
    parent: "PhaserMast",
    type: Phaser.AUTO,
    backgroundColor: "#000000",
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