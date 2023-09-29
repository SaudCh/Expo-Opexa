import { FontAwesome5, Entypo } from '@expo/vector-icons';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

export default function Options({ title, children, screen, logout, login }) {

    const navigation = useNavigation();
    const { Logout } = useAuth()


    return (
        <TouchableOpacity
            style={{ ...styles.container, backgroundColor: logout ? "rgba(255, 0, 0, 0.1)" : login ? "#fff" : "#fff" }}
            onPress={() => {
                !logout ?
                    navigation.navigate(screen)
                    :
                    Logout()
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>

                {children}
                <View style={{ marginStart: 10 }}>
                    <Text style={{ ...styles.text, color: logout ? "red" : login ? "green" : "#16161A" }}>
                        {title}
                    </Text>
                </View>
            </View>
            <Entypo name="chevron-thin-right" size={24} color={logout ? "red" : login ? "green" : "black"} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        color: '#16161A',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Circular'
    }
})