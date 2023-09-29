import React, { useEffect, useState } from 'react';
import {
    View, Text, Image,
    StyleSheet, FlatList, Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';

import { PaperInput } from '../../components/Inputs';
import SubmitButton from '../../components/SubmitButton';
import Header from '../../components/AddProduct/Header';
import ImageViewer from '../../components/AddProduct/ImageViewer';
import Location from '../../components/AddProduct/Location';
import useFirebase from '../../hooks/useFirebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../config/firebase';
import { getImageUrl } from '../../utils/getImageUrl';


const EditProductScreen = ({ route }) => {

    const { category, subcategory, furthercategory, product } = route.params
    const navigation = useNavigation()
    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [data, setData] = useState({
        title: product.title,
        description: product.description,
        price: '',
    })
    const [loading, setLoading] = useState(false)
    const { uploadImages } = useFirebase()
    const user = auth.currentUser
    const [isVisible, setIsVisible] = useState(false)
    const [index, setIndex] = useState(0)
    const openImage = () => setIsVisible(true)
    const closeImage = () => setIsVisible(false)
    const [inputs, setInputs] = useState([])

    const [location, setLocation] = useState()

    const { showActionSheetWithOptions } = useActionSheet();


    const openActionSheet = () => {
        const options = ['Take a photo', 'Pick from gallery', 'Cancel'];

        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            // destructiveButtonIndex
        }, (selectedIndex = number) => {
            switch (selectedIndex) {
                case 0:

                    break
                case 1:
                    pickImage()
                    break;
                case cancelButtonIndex:
                    // Canceled
                    break
            }
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            setSelectedImages([
                ...selectedImages, ...result.assets
            ]);
            setImages([
                ...images, ...result.assets.map((e) => { return { url: e.uri } })
            ])
        }
    };

    const deleteImage = () => {
        const newImages = [...selectedImages]
        newImages.splice(index, 1)
        setSelectedImages(newImages)

        const newImages2 = [...images]
        newImages2.splice(index, 1)
        setImages(newImages2)

    }

    const addProduct = async () => {
        setLoading(true)

        const images = await uploadImages(selectedImages)

        const product = {
            ...data,
            images,
            category: category,
            subcategory: subcategory,
            furthercategory: furthercategory,
            location: location ? location : {},
            createdAt: new Date(),
            status: 'pending',
            user: user?.uid
        }

        setLoading(false)

    };

    return (
        <>
            <FlatList
                contentContainerStyle={{
                    margin: 10
                }}
                data={inputs}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.uri }} style={styles.image} />
                )}
                ListHeaderComponent={
                    <>


                        <View>
                            <Text style={styles.label}>You can add upto 20 images</Text>
                        </View>

                        <Header
                            selectedImages={selectedImages}
                            openActionSheet={openActionSheet}
                            setIndex={setIndex}
                            openImage={openImage}
                            deleteImage={deleteImage}
                        />

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10
                        }}>
                            {
                                category?.image
                                &&
                                <Image
                                    source={{ uri: getImageUrl(category.image) }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50,
                                    }}
                                />

                            }
                            <View style={{
                                marginLeft: 10
                            }}>

                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: Colors.primary
                                }}>{category.name}</Text>
                                {subcategory?.name && !furthercategory?.name && <Text>{subcategory.name}</Text>}
                                {furthercategory?.name && <Text>{furthercategory.name}</Text>}
                            </View>
                        </View>

                        <PaperInput
                            label="Title"
                            value={data.title}
                            onChangeText={(text) => setData({ ...data, title: text })}
                        />

                        <PaperInput
                            label="Price"
                            value={data.price}
                            onChangeText={(text) => setData({ ...data, price: text })}
                            keyboardType="number-pad"
                        />

                        <PaperInput
                            label="Description"
                            value={data.description}
                            onChangeText={(text) => setData({ ...data, description: text })}
                            multiline
                            numberOfLines={4}
                        />

                        <Location
                            location={location}
                            setLocation={setLocation}
                        />

                        <SubmitButton
                            onPress={addProduct}
                            title="Add Product"
                            loading={loading}
                        />

                    </>
                }
            />

            <ImageViewer
                isVisible={isVisible}
                closeImage={closeImage}
                images={images}
                index={index}
                setIndex={setIndex}
            />
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
        color: Colors.primary
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
});

export default EditProductScreen;
