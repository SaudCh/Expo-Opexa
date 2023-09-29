import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, Image } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import Rating from '../../components/rating';
import { Colors } from '../../constants/colors';
import LottieView from "lottie-react-native";

const FeedbackScreen = () => {
    const [feedbackText, setFeedbackText] = useState('');
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const animation = useRef(null);

    const handleSubmitFeedback = () => {
        // Your code for submitting feedback goes here
        setIsSnackbarVisible(true);
        setFeedbackText('');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LottieView
                    style={styles.lottie}
                    autoPlay
                    ref={animation}
                    source={require("../../assets/login.json")}
                />
                <Rating rating={rating} setRating={setRating} />
                <TextInput
                    mode='outlined'
                    label="Feedback"
                    value={feedbackText}
                    onChangeText={(text) => setFeedbackText(text)}
                    multiline
                    style={styles.textInput}
                    theme={{ colors: { primary: Colors.primary } }}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleSubmitFeedback}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Snackbar
                    visible={isSnackbarVisible}
                    onDismiss={() => setIsSnackbarVisible(false)}
                    duration={3000}
                >
                    Feedback submitted!
                </Snackbar>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    textInput: {
        marginBottom: 16,
        minHeight: 100,
    },
    buttonContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 4,
        paddingVertical: 15,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    lottie: {
        width: 300,
        height: 300,
        alignSelf: "center"
    },
});

export default FeedbackScreen;