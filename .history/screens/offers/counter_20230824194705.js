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
        const date = new Date(remainingTime)
        const now = new Date()
        const diff = date - now

        const hours = Math.floor(diff / 1000 / 60 / 60)
        const minutes = Math.floor(diff / 1000 / 60) - (hours * 60)
        const seconds = Math.floor(diff / 1000) - (minutes * 60) - (hours * 60 * 60)

        return `${hours}h ${minutes}m ${seconds}s`
    };

    return (
        <View style={styles.container}>
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
