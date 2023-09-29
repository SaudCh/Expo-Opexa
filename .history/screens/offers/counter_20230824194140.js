import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Svg, { Rect } from 'react-native-svg';
import { Colors } from '../../constants/colors';

export default function Counter({
    remainingTime
}) {
    const [timeLeft, setTimeLeft] = useState(remainingTime);
    const totalDuration = remainingTime;

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1000); // Subtract one second
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const progressBarWidth = (timeLeft / totalDuration) * 100;

    const formattedTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Svg width="100%" height="20">
                <Rect x="0" y="0" width={`${progressBarWidth}%`} height="20" fill="#FF4500" />
            </Svg>
            <Text style={styles.timerText}>{formattedTime(timeLeft / 1000)}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
