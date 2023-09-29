import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function index() {
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