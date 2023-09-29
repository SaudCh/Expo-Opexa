import { Camera, CameraType } from 'expo-camera';

import { StyleSheet, Text, View, Modal as RNModal, Button, Alert } from 'react-native'
import React, { useState } from 'react'

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

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    if (!permission?.granted) {
        if (!visible) return null;

        Alert.alert(
            "Permission Required",
            "We need your permission to show the camera",
            [
                {
                    text: "Cancel",
                    onPress: () => onDismiss(),
                    style: "cancel"
                },
                { text: "Grant Permission", onPress: () => requestPermission() }
            ]
        );
    }

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

                <Camera style={styles.camera} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>

            </View>
            {children}
        </RNModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})