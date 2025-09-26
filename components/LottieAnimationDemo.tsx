import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import LottieAnimation from './LottieAnimation';

const LottieAnimationDemo = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [progress, setProgress] = useState(0);
    const [useLocalAnimation, setUseLocalAnimation] = useState(true);

    const animationSource = require('../assets/animations/sandClock.json');

    const toggleAnimation = () => {
        setIsPlaying(!isPlaying);
    };

    const changeSpeed = () => {
        const newSpeed = speed === 1 ? 2 : speed === 2 ? 0.5 : 1;
        setSpeed(newSpeed);
    };

    const resetAnimation = () => {
        setProgress(0);
        setIsPlaying(true);
    };

    const toggleAnimationSource = () => {
        setUseLocalAnimation(!useLocalAnimation);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lottie Animation Demo</Text>

            <View style={styles.animationContainer}>
                <LottieAnimation
                    source={animationSource}
                    autoplay={isPlaying}
                    loop={true}
                    speed={speed}
                    // progress={progress}
                    style={styles.animation}
                />
            </View>

            <View style={styles.controls}>
                <Button
                    title={isPlaying ? "Pause" : "Play"}
                    onPress={toggleAnimation}
                />
                <Button
                    title={`Speed: ${speed}x`}
                    onPress={changeSpeed}
                />
                <Button
                    title="Reset"
                    onPress={resetAnimation}
                />
            </View>

            <View style={styles.sourceControl}>
                <Button
                    title={useLocalAnimation ? "Use Remote" : "Use Local"}
                    onPress={toggleAnimationSource}
                />
            </View>

            <Text style={styles.info}>
                Status: {isPlaying ? 'Playing' : 'Paused'} | Speed: {speed}x
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    animationContainer: {
        width: 200,
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 180,
        height: 180,
    },
    controls: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    sourceControl: {
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default LottieAnimationDemo;
