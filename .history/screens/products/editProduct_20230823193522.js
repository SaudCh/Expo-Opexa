import { Entypo } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import {
    View, Text, Image,
    StyleSheet, FlatList, Alert, BackHandler, TouchableOpacity,
} from 'react-native';

import { Colors } from '../../constants/colors';
import { PaperInput } from '../../components/Inputs';
import SubmitButton from '../../components/SubmitButton';
import Header from '../../components/AddProduct/Header';
import ImageViewer from '../../components/AddProduct/ImageViewer';
import { getImageUrl } from '../../utils/getImageUrl';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import LocationInput from '../../components/location';
import CameraScreen from '../../components/camera';


const AddProductScreen = ({ route }) => {

    const { user } = useAuth()
    const { updateImages } = useApi()
    const navigation = useNavigation()
    const { showActionSheetWithOptions } = useActionSheet();
    const { expert, category, subcategory, furthercategory, inputs, ...product } = route.params.product

    console.log(Object.keys(product))

    const [images, setImages] = useState(product.images)
    const [selectedImages, setSelectedImages] = useState(product.images);
    const [data, setData] = useState({
        title: product?.title,
        description: product?.description,
        price: product?.price?.toString(),
        state: product?.state,
        city: product?.city,
        area: product?.area,
        stateCode: product?.stateCode,
    })
    const [inputData, setInputData] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [index, setIndex] = useState(0)
    const [location, setLocation] = useState(false)
    const [camera, setCamera] = useState(false)

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
                    setCamera(true)
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

        const errors = Validator(data, selectedImages)

        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            return
        }

        const imgRes = await updateImages(selectedImages, setLoading)

        if (imgRes.status !== 200) {
            return
        }

        console.log(imgRes.images)

        setLoading(true)
        await axios
            .post('product', {
                inputs: inputs,
                inputsData: inputData,
                title: data.title,
                description: data.description,
                price: data.price,
                images: imgRes.images,
                state: data.state,
                city: data.city,
                area: data.area,
                stateCode: data.stateCode,
                // location: location,
                category: category.id,
                subcategory: subcategory?.id,
                furthercategory: furthercategory?.id,
                user: user.id,
                expert: expert
            })
            .then((res) => {

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

            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) });


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
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <PaperInput
                        label={item.name}
                        value={inputData.name}
                        onChangeText={(text) => setInputData({ ...inputData, [item.name]: text })}
                    />
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
                            onChangeText={(text) => setData({ ...data, price: text.replace(/[^0-9]/g, '') })}
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


                    </>
                }
                ListFooterComponent={
                    <>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10
                        }}>

                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                    backgroundColor: Colors.primary,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Entypo name="location-pin" size={40} color="#fff" />
                            </View>

                            {data.area ?
                                <View style={{
                                    marginLeft: 10
                                }}>

                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'semibold',
                                        color: Colors.primary
                                    }}>{data.area.substring(0, 22)}{data.area.length > 22 && "..."}</Text>
                                    {<Text>{data?.city},{data.state}</Text>}
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={() => setLocation(true)}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        color: Colors.primary,
                                        marginLeft: 10
                                    }}>
                                        Select Location
                                    </Text>
                                </TouchableOpacity>
                            }

                            {
                                data.area &&
                                <TouchableOpacity
                                    onPress={() => setLocation(true)}
                                    style={{
                                        marginLeft: 'auto'
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 15,
                                        color: Colors.primary,
                                        marginLeft: 10
                                    }}>
                                        Change
                                    </Text>
                                </TouchableOpacity>
                            }
                        </View>

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

            {camera && <CameraScreen
                visible={camera}
                onDismiss={() => setCamera(false)}
                title="Take a photo"
                onCapture={(data) => {
                    console.log(data)
                    setSelectedImages([
                        ...selectedImages, data
                    ]);
                    setImages([
                        ...images, { url: data.uri }
                    ])
                    setCamera(false)
                }}
            />}

            <LocationInput
                visible={location}
                onDismiss={() => setLocation(false)}
                title="Select Location"
                setData={setData}
                data={data}
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

const Validator = (data, images) => {

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

    // if (!location) {
    //     errors.location = "Please select location"
    // }

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