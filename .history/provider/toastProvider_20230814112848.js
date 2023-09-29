import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ToastProvider({ children }) {
    return (
        <View>
            {children}
            {/* <Text>toastProvider</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({})