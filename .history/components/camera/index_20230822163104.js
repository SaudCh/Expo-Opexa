import { StyleSheet, Text, View, Modal as RNModal } from 'react-native'
import React from 'react'

import Header from './header';
import { TouchableOpacity } from 'react-native';

export default function Modal({
    visible,
    onDismiss,
    children,
    title,
    back,
    backPress
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
                    title={title}
                    onDismiss={() => onDismiss()}
                    back={back}
                    backPress={() => backPress()}
                >

                </Header>

            </View>
            {children}
        </RNModal>
    )
}

const styles = StyleSheet.create({})