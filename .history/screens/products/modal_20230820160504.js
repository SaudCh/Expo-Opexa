import { StyleSheet, Text, View } from 'react-native'
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

        </Modal>
    )
}

const styles = StyleSheet.create({})