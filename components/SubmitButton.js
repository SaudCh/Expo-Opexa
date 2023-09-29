import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'
import { ActivityIndicator, Button } from 'react-native-paper'

export default function SubmitButton({
    loading,
    onPress,
    title
}) {
    return (

        <TouchableOpacity
            style={styles.loginButton}
            onPress={onPress}
        >
            {
                loading ?
                    <ActivityIndicator color="#fff" />
                    :
                    <Text style={styles.text}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        padding: 10,
        marginTop: 20,
        overflow: "hidden"
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    }
})