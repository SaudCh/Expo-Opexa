import ImageViewer from 'react-native-image-zoom-viewer';
import { Entypo } from '@expo/vector-icons';


import {
    Dimensions, Modal, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native'
import React from 'react'

export default function ImageViewerModal({
    isVisible,
    images,
    index,
    closeImage

}) {
    return (
        <Modal visible={isVisible} transparent={true}>
            <ImageViewer
                imageUrls={images}
                saveToLocalByLongPress={false}
                index={index}
                enableSwipeDown={true}
                onSwipeDown={closeImage}
                renderFooter={(index) => (
                    <View>
                        <TouchableOpacity
                            onPress={closeImage}
                            style={styles.crossIconContainer}
                        >
                            <Entypo name="circle-with-cross" size={34} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    crossIconContainer: {
        position: "absolute",
        bottom: Dimensions.get('window').height - 80,
        width: Dimensions.get('window').width - 10,
        alignItems: "flex-end",
    },
})