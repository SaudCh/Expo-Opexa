import axios from 'axios';
import { Button, Modal, Searchbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, FlatList, Alert } from 'react-native';

import { Colors } from '../../constants/colors';
import SubmitButton from '../../components/SubmitButton';
import useAuth from '../../hooks/useAuth';
import { getImageUrl } from '../../utils/getImageUrl';
import ProductModal from './productModal';
import CategoryModal from './categoryModal';
import SubcategoryModal from './subcategoryModal';
import FurCategoryModal from './furcategoyModal';


const actions = [
    {
        text: "Add Cash",
        icon: require("../../assets/cash.png"),
        name: "Cash",
        position: 1
    },
    {
        text: "Add Product",
        icon: require("../../assets/cash.png"),
        name: "Product",
        position: 2
    },
];


const ProductDetailScreen = ({ route }) => {

    const { title, price, images, id } = route.params.product;
    const navigation = useNavigation()
    const scrollY = new Animated.Value(0);
    const { user } = useAuth()

    const [cash, setCash] = useState(0)
    const [cashModal, setCashModal] = useState(false)
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [addModal, setAddModal] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [furthercategory, setFurthercategory] = useState('')
    const [product, setProduct] = useState('')

    const handleSubmit = async () => {

        if (selected.length < 1 && cash <= 0) {
            Alert.alert(
                "Error",
                "Please select a product or add cash",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            )

            return
        }

        setLoading(true)


    };


    useEffect(() => {
        const getProducts = async () => {
            setProducts([])
            await axios
                .get('product/my-products/' + user.id)
                .then((response) => {
                    setProducts(response.data.products)
                    setFilteredProducts(response.data.products)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        getProducts()
    }, [])

    useEffect(() => {

        if (search.length > 0) {
            const filtered = products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
            setFilteredProducts(filtered)
        } else {
            setFilteredProducts(products)
        }


    }, [search])


    return (
        <>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 90,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingHorizontal: 20,
                paddingBottom: 10,
                zIndex: 10,
            }}>

                <Animated.View
                    style={
                        {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 90,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                            backgroundColor: "#fff",
                            opacity: scrollY.interpolate({
                                inputRange: [0, 300],
                                outputRange: [0, 1],
                            }),
                        }}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                    }}
                >
                    <Ionicons name="chevron-back" size={40} color={Colors.primary} />
                </TouchableOpacity>

            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                style={styles.container}>
                {/* header bar */}

                <View
                    style={{
                        overflow: 'hidden',
                        marginTop: -1000,
                        paddingTop: 1000,
                        alignItems: "center"
                    }}
                >
                    <Animated.Image
                        source={{ uri: getImageUrl(images[0]) }}
                        style={{
                            width: '200%',
                            height: 200,
                            resizeMode: 'contain',
                            transform: [
                                {
                                    translateY: scrollY.interpolate({
                                        inputRange: [-300, 0, 300],
                                        outputRange: [-300 / 2, 0, 300 * 0.75],
                                    }),
                                },
                                {
                                    scale: scrollY.interpolate({
                                        inputRange: [-300, 0, 300],
                                        outputRange: [2, 1, 0.75],
                                    }),
                                },
                            ],
                        }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>PKR {price}</Text>

                    <Text style={[styles.title, { color: Colors.primary, marginTop: 10 }]}>
                        Choose Your Product/s for bartering
                    </Text>

                    <Searchbar
                        placeholder="Search Product"
                        style={{
                            marginTop: 10,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0,
                        }}
                        onChangeText={(text) => {
                            setSearch(text)
                        }
                        }
                        value={search}
                    />

                    <TouchableOpacity
                        onPress={
                            () => {
                                setCashModal(true)
                            }
                        }
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            backgroundColor: cash > 0 ? Colors.lightgreen : '#fff',
                            borderRadius: 5,
                            padding: 10,
                            alignItems: 'center',
                            borderColor: cash > 0 ? Colors.primary : '#fff',
                            borderWidth: 2,
                        }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                                marginRight: 10,
                                backgroundColor: Colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={require("../../assets/cash.png")}
                                style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginBottom: 5
                                }}
                            >
                                Cash
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    marginBottom: 5

                                }}
                            >
                                PKR {cash}
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            const selectedP = selected.find(
                                (product) => product === item._id
                            )

                            return (
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            if (selected.includes(item._id)) {
                                                setSelected((prev) => prev.filter((id) => id !== item._id))
                                            } else {
                                                setSelected((prev) => [...prev, item._id])
                                            }
                                        }
                                    }
                                    style={{
                                        marginTop: 20,
                                        flexDirection: 'row',
                                        backgroundColor: selectedP ? Colors.lightgreen : '#fff',
                                        borderRadius: 5,
                                        padding: 10,
                                        alignItems: 'center',
                                        borderColor: selectedP ? Colors.primary : "#fff",
                                        borderWidth: 2,
                                    }}>
                                    <Image
                                        source={{ uri: getImageUrl(item.images[0]) }}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            resizeMode: 'contain',
                                            marginRight: 10
                                        }}
                                    />

                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '600',
                                                marginBottom: 5
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '500',
                                                marginBottom: 5

                                            }}
                                        >
                                            PKR {item.price}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        }
                        }

                    />



                    <View
                        style={{
                            height: 100
                        }}
                    />
                </View>
            </Animated.ScrollView >

            <View
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    left: 20,
                    zIndex: 1
                }}
            >
                <SubmitButton
                    onPress={handleSubmit}
                    title="Submit"
                    loading={loading}
                />
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    right: -10,
                    zIndex: 1
                }}
            >
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        if (name == 'Cash') {
                            setCashModal(true)
                            return
                        } else if (name == 'Product') {
                            setAddModal('category')
                            return
                        }

                    }}
                />
            </View>

            <Modal
                visible={cashModal}
                transparent={true}
                animationType="slide"
                onDismiss={() => setCashModal(false)}
            >
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, minHeight: 300, marginHorizontal: 10, justifyContent: 'center' }}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: Colors.primary,
                            fontSize: 20,
                            marginBottom: 10,
                            fontWeight: 'bold'
                        }}
                    >
                        Add Cash
                    </Text>
                    <TextInput
                        label="Cash"
                        placeholder="Enter Cash"
                        style={{
                            backgroundColor: '#f2f2f2',
                            borderRadius: 5,
                            marginBottom: 10
                        }}
                        mode={'outlined'}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            if (text == '') {
                                setCash(0)
                            } else {
                                setCash(text.replace(/[^0-9]/g, ''))
                            }
                        }
                        }
                    />
                    <Button
                        mode="contained"
                        onPress={() => setCashModal(false)}
                    >
                        Add Cash
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => setCashModal(false)}
                        style={{
                            marginTop: 10,
                            borderColor: Colors.primary
                        }}
                    >
                        Cancel
                    </Button>
                </View>
            </Modal>

            {
                addModal == "category" && (
                    <CategoryModal
                        visible={addModal === "category"}
                        onDismiss={() => setAddModal('')}
                        selectCategory={(category) => {
                            setCategory({
                                id: category._id,
                                name: category.name,
                                image: category.image
                            })

                            if (category.subcategories.length > 0) {
                                setAddModal('subcategory')
                            } else {
                                setAddModal('product')
                            }
                            console.log()
                            // setAddModal('subcategory')
                        }}
                    />
                )
            }

            {
                addModal == "subcategory" && (
                    <SubcategoryModal
                        visible={addModal === "subcategory"}
                        onDismiss={() => setAddModal('')}
                        selectSubcategory={(subcategory) => {
                            setAddModal('furthercategory')
                        }}
                        category={category.id}
                        backPress={() => setAddModal('category')}
                    />
                )

            }

            {
                addModal == "furthercategory" && (
                    <FurCategoryModal
                        visible={addModal === "furthercategory"}
                        onDismiss={() => setAddModal('')}
                        selectSubcategory={(furthercategory) => {
                            setAddModal('product')
                        }}
                        category={category.id}
                        subcategory={subcategory.id}
                        backPress={() => setAddModal('subcategory')}
                    />
                )

            }

            {
                addModal === "product" && (
                    <ProductModal
                        visible={addModal === "product"}
                        onDismiss={() => setAddModal('')}
                        user={user.id}
                        backPress={() => {
                            if (furthercategory.id) {
                                setAddModal('furthercategory')
                            } else if (subcategory.id) {
                                setAddModal('subcategory')
                            } else {
                                setAddModal('category')
                            }

                        }}
                    />
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    detailContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.primary,
        paddingVertical: 10,
        marginVertical: 5,
    },
    infoContainer: {
        padding: 20,
        paddingTop: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
        lineHeight: 25
    },
    button: {
        marginTop: 10,
    },

    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bidContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    bidInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        flex: 1,
        textAlign: 'center',
    },
    placeBidButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10
    },
    placeBidText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    profileTextContainer: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    memberSince: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    seeProfile: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 30,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    btmButton: {
        flex: 1,
        alignItems: 'center',
    },
    btmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    readMore: {
        color: Colors.primary,
        fontSize: 16,
        textTransform: 'uppercase',
        marginBottom: 20
    }

});

export default ProductDetailScreen;
