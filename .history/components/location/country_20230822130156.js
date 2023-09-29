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
            visible={true}
            onDismiss={() => { }}
            title='Select City'
        >

        </Modal>
    )
}

const styles = StyleSheet.create({})