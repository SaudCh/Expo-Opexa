import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, FlatList, Dimensions } from 'react-native';

import useAuth from '../../hooks/useAuth';
import { Colors } from '../../constants/colors';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import { Card } from 'react-native-paper';
import Slider from '../../components/slider';

const ProductDetailScreen = ({ route }) => {

    const { bid } = route.params
    console.log(bid)
    const { title, price, images } = route.params.product;
    const navigation = useNavigation()
    const scrollY = new Animated.Value(0);

    const [loading, setLoading] = useState(false);

    return (
        <FlatList
            data={route.params.bid.products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
                console.log(item)
                return (
                    <Card style={{ margin: 10, padding: 10 }}>
                        <Slider
                            images={
                                item.images.map((image) => { return { url: getImageUrl(image) } })
                            }
                            height={150}
                            width={Dimensions.get('window').width - 100}
                        />
                    </Card>
                );
            }}
            ListHeaderComponent={() => {
                return (
                    <View style={styles.infoContainer}>
                        <Image source={{ uri: getImageUrl(images[0]) }} style={styles.image} />
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>{formatCurrencyPKR(price)}</Text>

                        <View style={styles.detailContainer}>
                            <Text style={styles.description}>{bid.price}</Text>
                        </View>
                    </View>
                )
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
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
    chatBtn: {
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10
    },
    chatBtnText: {
        color: Colors.primary,
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
