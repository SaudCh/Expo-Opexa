import { StyleSheet, Text, View, Modal as RNModal } from 'react-native'
import React from 'react'

import Header from './header';

export default function Modal({
    visible,
    onDismiss
}) {
    return (
        <RNModal
            visible={visible}
            onDismiss={() => onDismiss()}
            animationType='slide'
        >
            <View style={{
                paddingTop: 50,
            }}
            >
                <Header
                    title="Add Product"
                >

                </Header>

            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({})