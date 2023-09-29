import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import * as Font from "expo-font";

import { Colors } from "../../constants/colors.js";
import LogoWhite from "../../svgs/logoWhite.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth.js";

export default function SplashScreen() {
    const navigation = useNavigation();
    const [loaded, setLoaded] = useState(false);
    const animation = useRef(null);
    // const { Login } = useAuth()

    const loadfonts = async () => {
        await Font.loadAsync({
            Montserrat: require("../../assets/fonts/Montserrat.ttf"),
            Circular: require("../../assets/fonts/CircularStd.ttf"),
            CircularBold: require("../../assets/fonts/CircularStd-Bold.otf"),
        });
        setLoaded(true);
    };
    useEffect(() => {
        loadfonts();
    }, []);

    // useEffect(() => {
    //     return () => animation.stop()
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                // Login()
            }, 1000);
        }, [])
    )
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.parent}>
                    <LogoWhite />
                    {loaded ? <Text style={styles.text1}>OPEXA</Text> : null}
                </View>

                <LottieView
                    style={styles.lottie}
                    autoPlay
                    ref={animation}
                    source={require("../../assets/loader.json")}
                />
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.main,
    },
    parent: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text1: {
        marginTop: 10,
        fontSize: 24,
        fontFamily: "Montserrat",
        color: "white",
    },
    lottie: {
        width: 100,
        height: 100,

        alignSelf: "center",
    },
});