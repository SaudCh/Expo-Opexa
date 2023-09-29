import { AntDesign } from '@expo/vector-icons';

import React from 'react'
import { StyleSheet, Text, Modal, TouchableOpacity, View } from 'react-native'

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
                <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({})