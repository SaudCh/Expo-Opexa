import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Colors } from '../../constants/colors';

function PrivacyPolicyScreen() {
    return (
        <ScrollView style={styles.container}
            contentContainerStyle={{ alignItems: 'center' }}
        >
            <Text style={styles.title}>Privacy Policy</Text>
            <LottieView
                style={styles.animation}
                source={require('../../assets/privacy-policy.json')}
                autoPlay
                loop
            />
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet magna vel elit semper faucibus. Sed vehicula sodales diam, in rhoncus orci pharetra ac. Aliquam erat volutpat.
            </Text>
            <Text style={styles.text}>
                Praesent id quam eget velit venenatis mollis. Nullam tristique orci sit amet magna varius euismod. Sed condimentum, elit ac euismod mollis, mauris turpis dignissim sapien, eu lobortis lacus tortor vitae lectus.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Circular',
        color: Colors.primary,
        alignSelf: "center"
    },
    animation: {
        width: 300,
        height: 300,
        aspectRatio: 1,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Circular',
        alignSelf: 'flex-start'
    },
});

export default PrivacyPolicyScreen;
