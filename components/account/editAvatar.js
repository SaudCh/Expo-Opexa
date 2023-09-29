import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function EditAvatar({
    image,
    setImage,
    preview
}) {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {
                    image ?
                        <Image
                            source={{ uri: image?.uri }}
                            style={styles.avatar}
                        />
                        :
                        <Image
                            source={{ uri: preview ? preview : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" }}
                            style={styles.avatar}
                        />
                }
                {/* <Image
                    source={{ uri: image?.uri ? image.uri : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" }}
                    style={styles.avatar}
                /> */}
                <TouchableOpacity style={styles.camera} onPress={pickImage}>
                    <AntDesign name="camerao" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
    imageContainer: {
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    },
    camera: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff'
    }
})