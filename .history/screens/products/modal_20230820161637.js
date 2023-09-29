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
            >
                <Text>Close</Text>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({})