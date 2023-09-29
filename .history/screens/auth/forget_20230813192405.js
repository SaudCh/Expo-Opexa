import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import axios from 'axios';

export default function ForgetPasswordScreen() {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({})

    const handleLogin = async () => {

        if (!email) {
            Alert.alert("Email Required")
            return
        }

        setLoading(true)

        await axios.post('auth/forgot-password')
            .then(res => {
                console.log(res)
                Alert.alert("Password Reset Link Sent")
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => { setLoading(false) })

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
                <View />
            </View>
            <View style={{ paddingTop: 30, paddingHorizontal: 30 }}>
                <Text style={styles.head}>
                    Forget Password
                </Text>
                <Text style={styles.normal}>
                    Enter your email address to reset your password
                </Text>
            </View>
            <Animated.View style={[
                styles.slideView,
                { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }] }
            ]}
            >
                <View>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        keyboardType='email-address'

                    />

                    <SubmitButton
                        title="Reset Password"
                        onPress={handleLogin}
                        loading={loading}
                    />

                    <Button mode="outlined" textColor={Colors.primary} style={styles.googleBtn} onPress={() => navigation.goBack()}>
                        Back
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
        padding: 10,
        marginTop: 20,
        backgroundColor: Colors.primary,
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
    }
});
