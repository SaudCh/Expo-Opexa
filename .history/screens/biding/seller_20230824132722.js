import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Button } from 'react-native-paper';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import EmptyData from '../../components/emptyData';
import { RefreshControl } from 'react-native';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';

const ProductList = () => {

    const { user } = useAuth()
    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const renderProductItem = ({ item }) => {
        const {
            images, title, description, price
        } = item.product
        return (
            <View
                style={{
                    flex: 1,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    padding: 10,
                }}
            >
                <View style={styles.itemContainer}>
                    <View style={{ position: 'relative' }}>
                        <Image source={{ uri: getImageUrl(images[0]) }} style={styles.itemImage} />
                    </View>
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{title}</Text>
                        <Text style={styles.itemPrice}>PKR {price}</Text>
                        <Text style={{ ...styles.itemPrice, textTransform: 'capitalize' }}>{description}</Text>
                    </View>

                </View>
                <FlatList
                    data={item.bids}
                    horizontal={true}
                    renderItem={({ item }) => {
                        console.log(item)
                        return (
                            <View style={{
                                marginHorizontal: 10,
                            }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Cash: </Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{formatCurrencyPKR(item.cash)}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {
                                        item.products.length === 0 &&
                                        <Text style={{ fontSize: 12, color: Colors.secondary }}>
                                            No Products
                                        </Text>
                                    }
                                    {
                                        item.products.map((product) => {
                                            return (
                                                <View style={{}}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product.title}</Text>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product.price}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>

                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    };

    const getProducts = async () => {
        await axios.get('bid?seller=' + user.id)
            .then((res) => {
                setProducts(res.data.bids)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {


        getProducts()

    }, [])

    const handleRejectAccept = async (id, status) => {

    }

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
