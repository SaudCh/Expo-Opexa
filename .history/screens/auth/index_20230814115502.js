import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import * as Font from "expo-font";

import { Colors } from "../../constants/colors.js";
import LogoWhite from "../../svgs/logoWhite.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function LandingScreen() {
    const navigation = useNavigation();
    const animation = useRef(null);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{
                    alignSelf: 'flex-end',
                    marginRight: 10
                }}
                    onPress={() => navigation.replace("BottomTabs")}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <LottieView
                    style={styles.lottie}
                    autoPlay
                    ref={animation}
                    source={require("../../assets/login.json")}
                />
                <Text style={styles.heading}>OPXA</Text>
                <Text style={styles.normal}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                </Text>

                <Button
                    mode="contained"
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 5,
                        width: 300,
                    }}
                    buttonColor={'#fff'}
                    textColor={Colors.primary}
                >
                    Login
                </Button>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={{
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 5,
                        width: 300,
                    }}
                >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                        Register
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
        paddingTop: 40
    },
    heading: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 18,
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
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 20,
    },
});