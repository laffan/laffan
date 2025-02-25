const getGameConfig = async () => {
  if (typeof window === "undefined") {
    return null; // Prevents execution during SSR
  }

  const Phaser = await import("phaser");
  const { LoadScene } = await import("./scenes/LoadScene");

  return {
    parent: "PhaserMast",
    type: Phaser.AUTO,
    backgroundColor: "#FCFCFC",
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
    scene: [LoadScene],
  };
};

export default getGameConfig;