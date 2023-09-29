import { AntDesign } from '@expo/vector-icons';

import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { formatCurrencyPKR } from '../utils/currencyFormatter';
import { getImageUrl } from '../utils/getImageUrl';
import useWishlist from '../hooks/useWishlist';
import useAuth from '../hooks/useAuth';

const ProductCard = ({ product }) => {

    const navigation = useNavigation()
    const { isWishlisted, removeFromWishlist, addToWishlist } = useWishlist()
    const { user, isLoggedIn } = useAuth()

    const { _id } = product


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("ProductDetail", {
                name: product?.name,
                product: product
            })}
        >

            {
                product?.expert && (
                    <View style={{
                        position: 'absolute',

                        top: 10,
                        left: 10,
                        backgroundColor: Colors.primary,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        zIndex: 10,
                    }}>
                        <Text style={{
                            color: '#fff',
                        }}>Expert</Text>
                    </View>
                )
            }
            <Image source={{ uri: getImageUrl(product.images[0]) }} style={styles.image} />

            {
                isWishlisted(_id) ?

                    <TouchableOpacity
                        onPress={() => {
                            if (!isLoggedIn) return
                            removeFromWishlist(_id)
                        }}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    >
                        <AntDesign name="heart" size={24} color={Colors.danger} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            if (!isLoggedIn) return navigation.navigate('Login', {
                                prev: true
                            })
                            addToWishlist(_id)
                        }}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    >
                        <AntDesign name="hearto" size={24} color={Colors.danger} />
                    </TouchableOpacity>
            }

            <Text style={styles.name}>{product.title}</Text>
            <Text style={styles.price}>{formatCurrencyPKR(product.price)}</Text>
            <Text style={styles.description}>{product.description ? product.description.substring(0, 10) : ""}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('window').width / 2 - 10,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 2,
    },
    price: {
        fontSize: 18,
        color: Colors.primary,
    },
});

export default ProductCard;
