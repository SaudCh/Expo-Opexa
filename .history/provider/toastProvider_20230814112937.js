import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ToastProvider({ children }) {
    console.log(children)
    return (
        <>
            {children}
            <Text style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'red', color: 'white', padding: 10 }}>Toast</Text>
        </>
    )
}

const styles = StyleSheet.create({})