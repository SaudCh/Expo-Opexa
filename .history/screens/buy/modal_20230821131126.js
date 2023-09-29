import { StyleSheet, Text, View, Modal as RNModal } from 'react-native'
import React from 'react'

import Header from './header';
import { TouchableOpacity } from 'react-native';

export default function Modal({
    visible,
    onDismiss,
    children
}) {
    return (
        <RNModal
            visible={visible}
            onDismiss={() => onDismiss()}
            animationType='slide'
        >
            {children}
        </RNModal>
    )
}

const styles = StyleSheet.create({})