import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieAnimationModule from './modules/lottie-animation-module/src/index';

const TestLottie = () => {
  return (
    <View style={styles.container}>
      <LottieAnimationModule
        source={require('./assets/lottie-animation.json')} // You'll need to add a Lottie JSON file here
        style={styles.lottie}
        loop={false}
        autoplay={false}
        speed={1.0}
        progress={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default TestLottie;
