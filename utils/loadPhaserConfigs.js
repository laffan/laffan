// utils/loadPhaserConfigs.js
export async function loadPhaserConfig(configName) {
  try {
    const configModule = await import(`../phaser-blocks/${configName}`);
    return await configModule.default();
  } catch (error) {
    console.error(`Failed to load Phaser config '${configName}':`, error);
    return null;
  }
}

export async function loadMultiplePhaserConfigs(configNames) {
  const configPromises = configNames.map(name => 
    loadPhaserConfig(name).then(config => ({ name, config }))
  );
  
  const results = await Promise.all(configPromises);
  return results.reduce((acc, { name, config }) => {
    if (config) {
      acc[name] = config;
    }
    return acc;
  }, {});
}