import { AntDesign } from '@expo/vector-icons';
import {
    Dimensions, FlatList, Image,
    Pressable,
    StyleSheet, Text,
    View
} from 'react-native'
import React from 'react'

import { Colors } from '../../constants/colors'
import { getImageUrl } from '../../utils/getImageUrl';

export default function Header({
    selectedImages,
    openActionSheet,
    setIndex,
    openImage,
    deleteImage
}) {
    return (
        <FlatList
            data={selectedImages}
            keyExtractor={(item, index) => item.uri ? item.uri : item}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        setIndex(selectedImages.indexOf(item))
                        openImage()
                    }}
                >
                    <Pressable
                        onPress={() => {
                            deleteImage(index)
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <AntDesign name="close" size={16} color="white" />
                    </Pressable>
                    {
                        item.uri ?
                            <Image source={{ uri: item.uri }} style={styles.image} />
                            :
                            <Image source={{ uri: getImageUrl(item) }} style={styles.image} />
                    }
                    {/* <Image source={{ uri: item.uri }} style={styles.image} /> */}
                </Pressable>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
                <Pressable style={{
                    height: 120,
                    width: Dimensions.get('window').width - 20,
                    backgroundColor: Colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10
                }}
                    onPress={openActionSheet}
                >
                    <Text style={[styles.label, { color: 'white' }]}>
                        Add Images
                    </Text>
                </Pressable>
            }
            ListFooterComponent={
                selectedImages.length > 0 && selectedImages.length < 20 ?
                    <Pressable
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: Colors.primary,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={openActionSheet}
                    >
                        <AntDesign name="plus" size={24} color="#fff" />
                    </Pressable>
                    :
                    <View />
            }
        />
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
        color: Colors.primary
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
        marginBottom: 16,
        borderRadius: 5
    },
});