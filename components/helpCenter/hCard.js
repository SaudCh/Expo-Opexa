import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

export default function HCard() {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>How do I apply for withdraw</Text>
            <Text style={styles.answer}>Praesent id quam eget velit venenatis mollis. Nullam tristique orci sit </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width - 100,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopColor: Colors.primary,
        borderTopWidth: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 20,
        marginStart: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Circular',
        color: Colors.primary
    },
    answer: {
        fontSize: 15,
        fontFamily: 'Circular',

    }
})