module.exports = {
  dependencies: {
    'react-native-safe-area-context': {
      platforms: {
        android: {
          packageInstance: 'new SafeAreaContextPackage()',
        },
      },
    },
    'react-native-screens': {
      platforms: {
        android: {
          packageInstance: 'new RNScreensPackage()',
        },
      },
    },
  },
};

