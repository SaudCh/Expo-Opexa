import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useWishlist from '../../hooks/useWishlist';
import { useFocusEffect } from '@react-navigation/native';
import { getImageUrl } from '../../utils/getImageUrl';

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

const RenderProductItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.itemContainer}
        onPress={onPress}
    >
        <View style={{ position: 'relative' }}>
            <Image source={{ uri: getImageUrl(item.images[0]) }} style={styles.itemImage} />
            <MaterialCommunityIcons name="heart-outline" size={24} color="red" style={styles.heartIcon} />
            <View
                style={styles.lightDark}
            />
        </View>
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Text style={styles.itemPrice}>{item.description}</Text>
        </View>
    </TouchableOpacity>
);

const ProductList = ({ navigation }) => {

    const { wishlist } = useWishlist()
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        await axios.get('wishlist')
            .then(res => {
                setProducts(res.data.wishlist)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchProducts()
        }, [])
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={
                    ({ item }) =>
                        <RenderProductItem
                            item={item}
                            onPress={() => navigation.navigate("ProductDetail", {
                                name: item?.name,
                                product: item
                            })}
                        />
                }
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ProductList;
