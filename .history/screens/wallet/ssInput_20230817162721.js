import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function SsInput({ label, image, setImage }) {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result);
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPress={pickImage}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginBottom: 20,
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: Colors.grey,
                    borderWidth: 1,

                }}
            >
                {
                    image ?
                        <Image
                            source={{ uri: image.uri }}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                        />
                        :
                        <Ionicons name="image-outline" size={50} color={Colors.grey} />
                }
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({})