const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'png', 'json', 'gif', 'webp', 'bmp', 'psd', 'svg', 'zip', 'mp4', 'avi', 'mov', 'mkv'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
