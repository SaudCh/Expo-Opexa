import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'

export default function RNModal({
    visible,
    onDismiss,
}) {
    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            animationType='slide'
        >
            <TouchableOpacity
                onPress={() => onDismiss()}
                style={{
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: 50,
                    right: 20,
                }}
            >
                <Text>Close</Text>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({})