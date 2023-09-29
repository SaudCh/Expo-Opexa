import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LogoWhite from '../svgs/logoWhite'

export default function Logo({ color, fontSize }) {
    return (

        <View style={styles.parent}>
            {color === 'white' ? <LogoWhite /> : <LogoGreen />}
            <Text style={{ ...styles.text1, color: color, fontSize: fontSize ? fontSize : 24 }}>OPEXA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    text1: {
        marginTop: 10,
        fontSize: 24,
        fontFamily: "Montserrat"
    },
})