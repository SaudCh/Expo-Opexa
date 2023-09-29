import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Button, TextInput } from 'react-native-paper';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useAuth } from '../../hooks/useAuth';
import SubmitButton from '../../components/SubmitButton';
import { PaperInput } from '../../components/Inputs'
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';

const provider = new GoogleAuthProvider();

export default function SlideView() {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const { } = useAuth()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleLogin = () => {

        const errors = Validate(data)

        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            return
        }

        SignInwithEmail(data, setLoading)

    };

    const handleGoogleLogin = () => {

        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         const user = result.user;
        //     }).catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         const email = error.customData.email;
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //     });

        navigation.navigate("LocationPrm");

    };

    const handleAppleLogin = () => {
        // Add code here to handle login
        navigation.navigate("LocationPrm");
    };

    const handlePhoneLogin = async () => {
        // Add code here to handle login
        navigation.navigate("PhoneNumberLogin");

    };

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();

    }, []);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.register}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 30, paddingHorizontal: 30 }}>
                <Text style={styles.head}>
                    Login
                </Text>
                <Text style={styles.normal}>
                    Login to your account
                </Text>
            </View>
            <Animated.View style={[
                styles.slideView,
                { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }] }
            ]}
            >
                <View>
                    <PaperInput
                        label="Email"
                        value={data.email}
                        onChangeText={(text) => setData({ ...data, email: text })}
                        error={errors.email}
                        keyboardType="email-address"
                    />
                    <PaperInput
                        label="Password"
                        value={data.password}
                        onChangeText={(text) => setData({ ...data, password: text })}
                        error={errors.password}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.fpcontainer} onPress={() => {
                        navigation.navigate("ForgetPassword");
                    }}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <SubmitButton
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                    />

                    {/* <Button mode="outlined" icon="google" textColor={Colors.primary} style={styles.googleBtn} onPress={handleGoogleLogin}>
                        Login with Google
                    </Button>
                    <Button mode="outlined" icon="apple" textColor={Colors.primary} style={styles.googleBtn} onPress={handleAppleLogin}>
                        Login with Apple
                    </Button> */}
                    <Button mode="outlined" icon="phone" textColor={Colors.primary} style={styles.googleBtn} onPress={handlePhoneLogin}>
                        Login with Phone
                    </Button>
                </View>
            </Animated.View>
        </View>
    );
}

const Validate = (data) => {

    const errors = {}

    if (!data.email) errors.email = "Email is Required"
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email))
        errors.email = "Invalid Email Address"

    if (!data.password) errors.password = "Password is Requried"
    else if (data.password.length < 6) errors.password = "Password must be atleast 6 characters"

    return errors
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: 40,
    },
    button: {
        padding: 10,
        paddingTop: 5,
        borderRadius: 5,
        color: '#fff',
    },
    register: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'CircularBold',
    },
    slideView: {
        flex: 1,
        marginTop: 80,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
    },
    head: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'CircularBold'
    },
    normal: {
        color: '#fff',
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'Circular',
    },
    fpcontainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    forgotPassword: {
        color: Colors.primary,
        fontSize: 15,
        fontFamily: 'Circular',
    },
    googleBtn: {
        color: Colors.primary,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginTop: 20,
    },
    phoneButton: {
        color: Colors.primary,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
        marginTop: 20,
    }
});
