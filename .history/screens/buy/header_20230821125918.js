import { AntDesign } from '@expo/vector-icons'

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'
import { TouchableOpacity } from 'react-native'

export default function Header({
    title,
    children,
    onDismiss,
    nl
}) {
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: 30,
                    height: 30
                }}
            >
                {children}
            </View>
            <Text style={styles.heading}>{title}</Text>
            <View
                style={{
                    width: 30,
                    height: 30
                }}
            >
                <TouchableOpacity
                    onPress={() => onDismiss()}
                >
                    <AntDesign name="close" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Circular',
        color: Colors.main
    },

})