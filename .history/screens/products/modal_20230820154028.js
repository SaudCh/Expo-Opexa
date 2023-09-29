import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'

export default function RNModal() {
    return (
        <Modal
            visible={true}
            onDismiss={() => { }}
            animationType='slide'
        >
            <Text>modal</Text>
        </Modal>
    )
}

const styles = StyleSheet.create({})