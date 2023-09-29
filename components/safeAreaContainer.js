import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SafeAreaContainer({
    children,
    styleProp = {}
}) {
    return (
        <SafeAreaView style={[styles.container, styleProp]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0 : 39
    }
})