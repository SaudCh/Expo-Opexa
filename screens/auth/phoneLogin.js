import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../config/firebase';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';

import { Colors } from '../../constants/colors';
import { useSocialLogin } from '../../hooks/useSocialLogin';
import SubmitButton from '../../components/SubmitButton';

export default function PhoneNumberLogin() {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [cca2, setCca2] = useState('PK');
    const [pickerData, setPickerData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const phoneRef = useRef(null);
    const recaptchaVerifier = React.useRef(null);
    const [loading, setLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const { phoneLogin } = useSocialLogin()

    const handleGoogleLogin = () => {
        // Add code here to handle login
        navigation.navigate("LocationPrm");
    };

    const handleAppleLogin = () => {
        // Add code here to handle login
        navigation.navigate("LocationPrm");
    };

    const handleEmailLogin = () => {
        // Add code here to handle login
        navigation.navigate("Login");
    };

    const onPressFlag = () => {
        setModalVisible(true);
    };

    const selectCountry = (country) => {
        if (phoneRef.current) {
            phoneRef.current.selectCountry(country.cca2.toLowerCase());
        }
        setCca2(country.cca2);
        setModalVisible(false);
    };

    useEffect(() => {
        if (phoneRef.current) {
            setPickerData(phoneRef.current.getPickerData());
        }
    }, []);

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
                    Login with Phone Number
                </Text>
                <Text style={styles.normal}>
                    Enter your phone number to continue
                </Text>
            </View>
            <Animated.View style={[
                styles.slideView,
                { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }] }
            ]}
            >
                <View>
                    <PhoneInput
                        ref={phoneRef}
                        onPressFlag={onPressFlag}
                        initialCountry={'pk'}
                        textProps={{ placeholder: 'Phone Number' }}
                        style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            padding: 10,
                            paddingVertical: 15,
                        }}
                        onChangePhoneNumber={(text) => {
                            setPhoneNumber(text);
                        }}
                    />

                    <CountryPicker
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSelect={(value) => selectCountry(value)}
                        translation="eng"
                        cca2={cca2}
                        placeholder=""

                    />

                    <SubmitButton
                        title="Continue"
                        onPress={() => phoneLogin({ phoneNumber, recaptchaVerifier }, setLoading)}
                        loading={loading}
                    />
                    {/* <TouchableOpacity onPress={() => phoneLogin({ phoneNumber, recaptchaVerifier })}>
                        <Text style={styles.loginButton}>Continue</Text>
                    </TouchableOpacity> */}
                    {/* <Button mode="outlined" icon="google" textColor={Colors.primary} style={styles.googleBtn} onPress={handleGoogleLogin}>
                        Login with Google
                    </Button>
                    <Button mode="outlined" icon="apple" textColor={Colors.primary} style={styles.googleBtn} onPress={handleAppleLogin}>
                        Login with Apple
                    </Button> */}
                    <Button mode="outlined" icon="email" textColor={Colors.primary} style={styles.googleBtn} onPress={handleEmailLogin}>
                        Login with Email
                    </Button>

                </View>
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
    container2: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
});
