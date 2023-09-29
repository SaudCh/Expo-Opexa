import { Camera, CameraType } from 'expo-camera';

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
                                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                    <Text style={styles.text}>Flip Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => { }}>
                                    <Text style={styles.text}>Take Picture</Text>
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