import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, Text, View, Modal as RNModal, Button, Alert, Linking } from 'react-native'
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

    return (
        <RNModal
            visible={visible}
            onDismiss={() => onDismiss()}
            animationType='slide'
        >
            <View style={{
                paddingTop: 40,
                flex: 1,
            }}
            >
                <Header
                    title={title}
                    onDismiss={() => onDismiss()}
                    back={back}
                    backPress={() => backPress()}
                >

                </Header>

                {
                    !permission || !permission.granted ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text>Permission not granted</Text>
                            <Button title="Grant Permission" onPress={() => {
                                if (!permission.canAskAgain) {
                                    Alert.alert(
                                        "Permission Required",
                                        "We need your permission to show the camera",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            {
                                                text: "Open Setting",
                                                onPress: () => {
                                                    Linking.openSettings()
                                                }
                                            }
                                        ]
                                    );
                                    return
                                }
                                requestPermission()
                            }} />
                        </View>
                    )
                        :
                        <Camera style={styles.camera} type={type}>
                            <View style={styles.buttonContainer}>
                                <View />
                                <TouchableOpacity style={styles.button} onPress={() => { }}>
                                    <Text style={styles.text}>Take</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button]} onPress={toggleCameraType}>
                                    <MaterialIcons name="flip-camera-android" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                }

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
        borderColor: 'red',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 1,
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