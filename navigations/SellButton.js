import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'

export default function SellButton({ children, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                justifyContent: "center",
                alignItems: "center",
                top: -20,
            }}
        >
            <View
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 35,
                    backgroundColor: '#fff',
                    borderColor: Colors.main,
                    borderWidth: 2,
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
    )
}