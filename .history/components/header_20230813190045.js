import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'

export default function Header({
    title,
    children,
    nl
}) {
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: 30,
                    height: 30
                }}
            />
            <Text style={styles.heading}>{title}</Text>
            <View>
                {children}
            </View>
            {nl && <View style={{
                width: 30,
                height: 30
            }}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Circular',
        color: Colors.main
    },

})