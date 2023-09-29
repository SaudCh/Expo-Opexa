import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from './modal'

export default function CityInput({
    visible,
    onDismiss,
    title,
}) {
    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={title}
        >

        </Modal>
    )
}

const styles = StyleSheet.create({})