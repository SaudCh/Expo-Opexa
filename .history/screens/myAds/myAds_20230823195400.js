import { Entypo } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import EmptyData from '../../components/emptyData';
import { Button, Divider, Menu } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    itemImage: {
        width: 120,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    lightDark: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
    },
});

const RenderProductItem = ({ item, onPress, deleteProduct, editProduct }) => {
    console.log(item)

    const [visible, setVisible] = React.useState(false);

    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={onPress}
        >
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: getImageUrl(item.images[0]) }} style={styles.itemImage} />
                {/* <MaterialCommunityIcons name="heart-outline" size={24} color="red" style={styles.heartIcon} /> */}
                <View
                    style={styles.lightDark}
                />
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{formatCurrencyPKR(item.price)}</Text>
                {/* <Text style={styles.itemPrice}>{item.description.substr(0, 80)}</Text> */}
                <Text style={styles.itemPrice}>{item.status.substr(0, 80)}</Text>
            </View>
            <TouchableOpacity
                style={styles.heartIcon}
            // onPress={heartPress}
            >
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Entypo name="dots-three-vertical" size={15} color="black" />
                        </TouchableOpacity>
                    }
                >

                    <Menu.Item
                        onPress={() => {
                            setVisible(false)
                            editProduct()
                        }}
                        title="Edit"
                    />
                    <Menu.Item onPress={() => {
                        setVisible(false)
                        Alert.alert(
                            "Delete Product",
                            "Are you sure you want to delete this product?",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "OK", onPress: () => deleteProduct(item._id)
                                }
                            ],
                            { cancelable: false }
                        );
                    }} title="Delete" />
                </Menu>
            </TouchableOpacity>
        </TouchableOpacity>
    )
};

const ProductList = ({ navigation }) => {

    const { user } = useAuth()
    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getData = async () => {
        await axios
            .get('product/my-products/' + user.id + "?status=active,not-for-sale,blocked")
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    )

    const deleteProduct = async (id) => {
        await axios
            .delete('product/' + id)
            .then((response) => {
                setProducts(products.filter(product => product._id !== id))
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <RenderProductItem
                        item={item}
                        onPress={() => navigation.navigate('ProductDetail', {
                            name: item?.name,
                            product: item
                        })}
                        deleteProduct={deleteProduct}
                        editProduct={() => navigation.navigate('EditProduct', {
                            name: item?.name,
                            product: item,
                            category: item.category,
                            subcategory: item.subcategory,
                            furthercategory: item.furthercategory,
                            expert: item.expert,
                        })}
                    />
                )}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyData onPress={getData} text={"No Ads Added Yet"} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                }
            />
        </View>
    );
};

export default ProductList;
