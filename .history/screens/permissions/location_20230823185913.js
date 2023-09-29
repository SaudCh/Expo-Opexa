import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

import { Colors } from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useLocation } from "../../hooks/useLocation";
import { useNotifications } from "../../hooks/useNotifications";

export default function LocationPrm() {
    const navigation = useNavigation();
    const animation = useRef(null);
    const { getLocation } = useLocation()
    const { checkPermission } = useNotifications()

    const openNotificationSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        } else {
            await Linking.openSettings();
        }
    }

    const handleNotification = async () => {
        if (! await checkPermission()) {
            navigation.replace("NotificationPrm")
        } else {
            navigation.replace("BottomTabs")
        }

    }

    const handlePress = async () => {

        if (!await getLocation()) {
            Alert.alert(
                "Premission Denied",
                "Please allow location permission to use this app. You can change this permission in settings.",
                [
                    {
                        text: "Skip",
                        onPress: () => handleNotification(),
                        style: "cancel",
                    },
                    { text: "Settings", onPress: () => openNotificationSettings() },
                ],
            )
        } else {
            handleNotification()
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
                    source={require("../../assets/location.json")}
                />
                <Text style={styles.heading}>Allow Squatting Toad to access your location?</Text>
                <Text style={styles.normal}>
                    Squatting Toad needs your location to provide you with.
                </Text>

                <Button
                    mode="contained"
                    onPress={handlePress}
                    style={{
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 5,
                        width: 300,
                    }}
                    buttonColor={'#fff'}
                    textColor={Colors.primary}
                >
                    Allow Location
                </Button>
                <TouchableOpacity
                    onPress={() => handleNotification()}
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
        marginTop: 18,
        fontFamily: "CircularBold",
        width: '90%',
        alignSelf: 'center'
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
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 20,
    },
});