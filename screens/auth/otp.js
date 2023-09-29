import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useSocialLogin } from '../../hooks/useSocialLogin';
import SubmitButton from '../../components/SubmitButton';
import firebase from '../../config/firebase';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";


export default function SlideView({ route }) {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [otp, setOtp] = React.useState('')
    const { verificationId, phoneNumber } = route.params
    const { VerifyPhoneOtp, phoneLogin } = useSocialLogin()
    const [loading, setLoading] = useState(false)
    const recaptchaVerifier = React.useRef(null);

    const handleLogin = () => {
        // Add code here to handle login
        if (otp.length < 6) {
            alert("Please enter a valid OTP")
            return
        }

        VerifyPhoneOtp({ verificationId, otp }, setLoading)

    };

    const handleResend = () => {
        // Add code here to handle login
        phoneLogin({
            phoneNumber,
            recaptchaVerifier,
        },
            setLoading
        )
    };

    const handlePhoneChange = () => {
        // Add code here to handle login
        navigation.goBack();
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
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 30, paddingHorizontal: 30 }}>
                <Text style={styles.head}>
                    Verify your Phone Number
                </Text>
                <Text style={styles.normal}>
                    We have sent you an OTP on {phoneNumber}
                </Text>
            </View>
            <Animated.View style={[
                styles.slideView,
                { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }] }
            ]}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View>
                        <OTPInputView
                            pinCount={6}
                            code={otp}
                            onCodeChanged={setOtp}
                            autoFocusOnLoad={false}
                            onCodeFilled={(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
                            style={styles.InputView}
                            codeInputFieldStyle={styles.Input}
                        />

                        <SubmitButton
                            title="Verify"
                            onPress={handleLogin}
                            loading={loading}
                        />


                        <TouchableOpacity onPress={handleResend}>
                            <Text style={styles.phoneButton}>Resend OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePhoneChange}>
                            <Text style={styles.phoneButton}>Change Phone Number</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
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
    loginButton: {
        color: '#fff',
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        padding: 10,
        marginTop: 20,
        overflow: 'hidden',
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
    },

    underlineStyleBase: {
        borderWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: Colors.primary,
    },

    InputView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    Input: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        marginTop: "10%",
        color: '#000',
        textAlign: "center",
        fontSize: 15,
    },

});
