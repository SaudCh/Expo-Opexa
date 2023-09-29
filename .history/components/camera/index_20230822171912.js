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

    const [loading, setLoading] = useState(false);
    const camRef = React.useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function captureImage() {
        if (camRef) {
            setLoading(true);
            const data = await camRef.current.takePictureAsync();
            setLoading(false);
            console.log(data.uri);
        }
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
                        <Camera
                            style={styles.camera}
                            type={type}
                            ref={camRef}
                        >
                            <View style={styles.buttonContainer}>
                                <View />
                                <TouchableOpacity
                                    style={styles.button} onPress={() => captureImage()}>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleCameraType}>
                                    <MaterialIcons name="flip-camera-android" size={30} color="#fff" />
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
        left: 0,
        right: 0,
        bottom: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})