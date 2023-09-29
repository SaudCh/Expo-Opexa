import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

export default function VCard() {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>How do I apply for withdraw</Text>
            <Text style={styles.answer}>31 Oct 2022 Payment</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopColor: Colors.primary,
        borderTopWidth: 1,
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Circular',
        color: Colors.primary
    },
    answer: {
        fontSize: 13,
        fontFamily: 'Circular',
        color: "rgba(0,0,0,0.5)"
    }
})