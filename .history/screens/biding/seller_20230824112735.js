import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { Button } from 'react-native-paper';
import { auth, db } from '../../config/firebase';

const ProductList = () => {

    const [products, setProducts] = useState([])
    const user = auth.currentUser

    const renderProductItem = ({ item }) => {
        const { productInfo } = item
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <View style={{ position: 'relative' }}>
                    <Image source={{ uri: productInfo.image }} style={styles.itemImage} />
                    {/* <MaterialCommunityIcons name="heart-outline" size={24} color="red" style={styles.heartIcon} /> */}
                </View>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{productInfo.title}</Text>
                    <Text style={styles.itemPrice}>PKR {item.bidAmount}</Text>
                    <Text style={{ ...styles.itemPrice, textTransform: 'capitalize' }}>{item.status}</Text>

                    {item.status == 'pending' &&
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Button
                                mode="contained"
                                color={Colors.primary}
                                style={{ marginTop: 10 }}
                                onPress={() => handleRejectAccept(item.id, 'accepted')}
                            >
                                Accept
                            </Button>
                            <Button
                                mode="outlined"
                                style={{
                                    marginTop: 10,
                                    borderColor: Colors.primary,
                                    padding: 0
                                }}
                                onPress={() => handleRejectAccept(item.id, 'rejected')}

                            >
                                Reject
                            </Button>
                        </View>
                    }
                </View>

            </TouchableOpacity>
        )
    };

    useEffect(() => {
        const getProducts = async () => {
            setProducts([])
            const q = query(collection(db, "bids"), where("sellerId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id, ...doc.data()
                    });
                });
                setProducts(data)
            });

            return unsubscribe
        }
        const unsubscribe = getProducts()

        return () => {
            unsubscribe
        }

    }, [])

    const handleRejectAccept = async (id, status) => {

        try {
            const washingtonRef = doc(db, "bids", id);

            await updateDoc(washingtonRef, {
                status
            });

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
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
