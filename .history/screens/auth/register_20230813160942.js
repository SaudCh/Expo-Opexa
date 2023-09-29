import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import { Colors } from '../../constants/colors';
import SubmitButton from '../../components/SubmitButton';
import { PaperInput } from '../../components/Inputs';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

export default function SlideView() {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    })
    // const { SignUpwithEmail } = useAuth()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();

    }, []);

    const handleRegister = async () => {
        const error = Validate(data)

        setErrors(error)
        if (Object.keys(error).length > 0) {
            return
        }

        setLoading(true)
        await axios.post('auth/signup', data)
            .then((res) => {
                console.log(res.data)
            }
            )
            .catch((err) => {
                console.log(err)
            }
            )
            .finally(() => {
                setLoading(false)
            })

    };

    const handleGoogleLogin = () => {
        // Add code here to handle login
        navigation.navigate("LocationPrm");
    };

    const handleAppleLogin = () => {
        // Add code here to handle login
        navigation.navigate("LocationPrm");
    };

    const handlePhoneLogin = () => {
        // Add code here to handle login
        navigation.navigate("PhoneNumberLogin");
    };

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.register}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 30, paddingHorizontal: 30 }}>
                <Text style={styles.head}>
                    Register
                </Text>
                <Text style={styles.normal}>
                    Register to your account
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
                        autoCapitalize="none"
                    />
                    <PaperInput
                        label="Password"
                        value={data.password}
                        onChangeText={(text) => setData({ ...data, password: text })}
                        error={errors.password}
                        secureTextEntry
                    />

                    <PaperInput
                        label="Confirm Password"
                        value={data.confirmpassword}
                        onChangeText={(text) => setData({ ...data, confirmpassword: text })}
                        error={errors.password}
                        secureTextEntry
                    />

                    <SubmitButton
                        title="Register"
                        onPress={handleRegister}
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

    if (!data.confirmpassword) errors.confirmpassword = "Confirm Password is Requried"
    else if (data.confirmpassword !== data.password) errors.confirmpassword = "Password does not match"

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
