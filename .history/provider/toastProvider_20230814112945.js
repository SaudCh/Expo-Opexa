import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ToastProvider({ children }) {
    console.log(children)
    return (
        <>
            {children}

        </>
    )
}

const styles = StyleSheet.create({})