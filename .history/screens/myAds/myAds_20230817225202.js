import { MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import EmptyData from '../../components/emptyData';

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

const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
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
        </View>
    </TouchableOpacity>
);

const ProductList = () => {

    const { user } = useAuth()
    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getData = async () => {
        await axios
            .get('product/my-products/' + user.id)
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

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyData onPress={getData} text={"No Favourites Yet"} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                }
            />
        </View>
    );
};

export default ProductList;
