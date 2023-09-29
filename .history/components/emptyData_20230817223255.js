import LottieView from 'lottie-react-native'

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/colors'

export default function EmptyData({ text }) {
    const navigation = useNavigation()

    const animation = React.useRef(null)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.primary }}>There is nothing here</Text>
            <Text style={{ fontSize: 14, color: Colors.secondary, marginTop: 10 }}>
                {text}
            </Text>
            <LottieView
                style={{
                    width: 300,
                    height: 300,
                    alignSelf: "center",
                    marginTop: 20,
                }}
                autoPlay
                ref={animation}
                source={require("../assets/empty.json")}
            />

            <Button mode="contained" style={{ ...styles.AddBtn }} buttonColor={Colors.secondary} onPress={() => navigation.navigate('Home')}>
                Home Page
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ fontSize: 14, color: Colors.primary, marginTop: 20 }}>Refresh the page here</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    AddBtn: {
        borderColor: Colors.secondary,
        borderRadius: 20,
        marginStart: 5,
        alignSelf: 'center',
        marginTop: 100
    }
})