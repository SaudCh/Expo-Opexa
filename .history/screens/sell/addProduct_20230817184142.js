import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import {
    View, Text, Image,
    StyleSheet, FlatList, Alert, BackHandler,
} from 'react-native';

import { Colors } from '../../constants/colors';
import { PaperInput } from '../../components/Inputs';
import SubmitButton from '../../components/SubmitButton';
import Header from '../../components/AddProduct/Header';
import ImageViewer from '../../components/AddProduct/ImageViewer';
import Location from '../../components/AddProduct/Location';
import { getImageUrl } from '../../utils/getImageUrl';
import useAuth from '../../hooks/useAuth';


const AddProductScreen = ({ route }) => {

    const { user } = useAuth()
    const navigation = useNavigation()
    const { showActionSheetWithOptions } = useActionSheet();
    const { expert, category, subcategory, furthercategory } = route.params

    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [data, setData] = useState({
        title: '',
        description: '',
        price: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [index, setIndex] = useState(0)
    const [inputs, setInputs] = useState([])
    const [location, setLocation] = useState()

    const openImage = () => setIsVisible(true)
    const closeImage = () => setIsVisible(false)

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

        const errors = Validator(data, selectedImages, location)

        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            return
        }


        setLoading(true)


        Alert.alert(
            "Success",
            "Your product has been added successfully and is pending approval",
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate('Ads'),
                    style: "cancel"
                }
            ]
        )

        setLoading(false)

    };

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);


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
                showsVerticalScrollIndicator={false}
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
                        {
                            errors.images &&
                            <Text style={{ color: "red" }}>{errors.images}</Text>
                        }

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
                            error={errors.title}
                        />

                        <PaperInput
                            label="Price"
                            value={data.price}
                            onChangeText={(text) => setData({ ...data, price: text })}
                            keyboardType="number-pad"
                            error={errors.price}
                        />

                        <PaperInput
                            label="Description"
                            value={data.description}
                            onChangeText={(text) => setData({ ...data, description: text })}
                            multiline
                            numberOfLines={4}
                            error={errors.description}
                        />

                        <Location
                            location={location}
                            setLocation={setLocation}
                        />
                        {
                            errors.location &&
                            <Text style={{
                                color: 'red',
                            }}>{errors.location}</Text>
                        }

                        <SubmitButton
                            onPress={addProduct}
                            title="Add Product"
                            loading={loading}
                        />

                        <View style={{ height: 100 }} />

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

const Validator = (data, images, location) => {

    let errors = {}

    if (!data.title) {
        errors.title = "Title is required"
    }

    if (!data.description) {
        errors.description = "Description is required"
    }

    if (!data.price) {
        errors.price = "Price is required"
    }

    if (images.length < 1) {
        errors.images = "Please select atleast one image"
    }

    if (!location) {
        errors.location = "Please select location"
    }

    return errors

}

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

export default AddProductScreen;
