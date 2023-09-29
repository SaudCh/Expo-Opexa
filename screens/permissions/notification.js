import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, Linking } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import * as Font from "expo-font";

import { Colors } from "../../constants/colors.js";
import LogoWhite from "../../svgs/logoWhite.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Alert } from "react-native";
import { useNotifications } from "../../hooks/useNotifications.js";

export default function NotificationPrm() {
    const navigation = useNavigation();
    const animation = useRef(null);


    const { AskForPermission } = useNotifications()

    const openNotificationSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        } else {
            await Linking.openSettings();
        }
    }

    const handlePress = async () => {

        if (!await AskForPermission()) {
            Alert.alert(
                "Premission Denied",
                "Please allow notification permission to use this app. You can change this permission in settings.",
                [
                    {
                        text: "Skip",
                        onPress: () => navigation.replace("BottomTabs"),
                        style: "cancel",
                    },
                    { text: "Settings", onPress: () => openNotificationSettings() },
                ],
            )
        } else {
            navigation.replace("BottomTabs")
        }

        // navigation.replace("NotificationPrm")
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <LottieView
                    style={styles.lottie}
                    autoPlay
                    ref={animation}
                    source={require("../../assets/notification.json")}
                />
                <Text style={styles.heading}>Allow Squatting Toad to access your notifications?</Text>
                <Text style={styles.normal}>
                    can send you notifications to keep you updated on new events.
                </Text>

                <Button
                    mode="contained"
                    onPress={() => handlePress()}
                    style={{
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 5,
                        width: 300,
                    }}
                    buttonColor={'#fff'}
                    textColor={Colors.primary}
                >
                    Activate
                </Button>
                <TouchableOpacity
                    onPress={() => navigation.replace("BottomTabs")}
                    style={{
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 5,
                        width: 300,
                    }}
                >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                        Skip
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    heading: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
        fontFamily: "CircularBold"
    },
    normal: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Circular",
        paddingHorizontal: 30,
    },
    lottie: {
        width: 270,
        height: 270,
        alignSelf: "center",
        marginTop: 20,
    },
});