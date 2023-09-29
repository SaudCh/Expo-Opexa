import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/colors'

export default function LoginFirst({ text }) {
    const navigation = useNavigation()
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.clientMain }}>Looks Like You are not Logged in!</Text>
            <Text style={{ fontSize: 14, color: Colors.secondary, marginTop: 10 }}>
                {text}
            </Text>

            <Button mode="contained" style={{ ...styles.AddBtn }} buttonColor={Colors.secondary} onPress={() => navigation.navigate('LoginScreen')}>
                Login Here
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                <Text style={{ fontSize: 14, color: Colors.clientMain, marginTop: 20 }}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    AddBtn: {
        borderColor: Colors.secondary,
        borderRadius: 20,
        marginStart: 5,
        alignSelf: 'center',
        marginTop: 100
    }
})