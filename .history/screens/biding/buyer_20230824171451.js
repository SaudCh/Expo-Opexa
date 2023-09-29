import { MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmptyData from '../../components/emptyData';
import { RefreshControl } from 'react-native';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const renderProductItem = ({ item }) => {
    const { productInfo } = item
    return (
        <TouchableOpacity style={styles.itemContainer}>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: productInfo.image }} style={styles.itemImage} />
                <MaterialCommunityIcons name="heart-outline" size={24} color="red" style={styles.heartIcon} />
                <View
                    style={styles.lightDark}
                />
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{productInfo.title}</Text>
                <Text style={styles.itemPrice}>PKR {productInfo.price}</Text>
                <Text style={{ ...styles.itemPrice, textTransform: 'capitalize' }}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    )
};

const ProductList = () => {

    const { user } = useAuth()
    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getProducts = async () => {
        setProducts([])

        await axios.get('bid/seller/' + user.id)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })


    }


    useEffect(() => {

        getProducts()

    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyData onPress={getProducts} text={"No Requests Added Yet"} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getProducts} />
                }
            />
        </View>
    );
};

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
        left: 10,
        backgroundColor: 'transparent',
        zIndex: 10,
        display: 'none'
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

export default ProductList;
