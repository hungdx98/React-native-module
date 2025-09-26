import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyLottie from '@coin98/lottie-animation-module';


interface LottieAnimationProps {
  source: any; // Support JSON objects from require() and strings
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  progress?: number;
  style?: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  loop = true,
  autoplay = true,
  speed = 1,
  progress,
  style,
}) => {
  // Convert string sources to objects for the native module
  const sourceObject = typeof source === 'string' ? { name: source } : source;

  return (
    <View style={[styles.container, style]}>
      <MyLottie
        source={sourceObject}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        progress={progress}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default LottieAnimation;
