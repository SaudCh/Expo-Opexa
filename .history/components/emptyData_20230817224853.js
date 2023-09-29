import LottieView from 'lottie-react-native'

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/colors'

export default function EmptyData({ text, onPress }) {
    const navigation = useNavigation()

    const animation = React.useRef(null)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.primary }}></Text>
            <Text style={{ fontSize: 14, color: Colors.secondary, marginTop: 10 }}>
                There is nothing here
            </Text>
            <LottieView
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: "center",
                }}
                autoPlay
                ref={animation}
                source={require("../assets/empty.json")}
            />


            <Text style={{ fontSize: 14, color: Colors.primary, marginTop: 100, textAlign: 'center' }}>Drag the screen down or press the below button to refresh</Text>

            <Button mode="contained" style={{ ...styles.AddBtn }} buttonColor={Colors.secondary} onPress={onPress}>
                Refresh
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    AddBtn: {
        borderColor: Colors.secondary,
        borderRadius: 20,
        marginStart: 5,
        alignSelf: 'center',
        marginTop: 10
    }
})