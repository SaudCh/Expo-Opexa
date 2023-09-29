import { Animated, FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Image } from 'react-native';
import Slider from '../../components/slider';
import SafeAreaContainer from '../../components/safeAreaContainer';
import ProductCard from '../../components/card';
import SearchBar from '../../components/SearchBar';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import CategoryList from '../../components/categories';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { db } from '../../config/firebase';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const IMAGES = [
    { url: 'http://www.property2day.com/images/selling-banner.jpg' },
    { url: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-promotion-facebook-cover-banner-design-template-904fb96ddd27f584e4da597e920ef22d_screen.jpg?ts=1630013522' },
];


export default function Home() {

    const navigation = useNavigation()

    const { user, isLoggedIn } = useAuth()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState('')
    const scrollY = new Animated.Value(0);

    useEffect(() => {
        const getData = async () => {

            const query = isLoggedIn ? '?user=' + user.id : ""

            await axios
                .get('category')
                .then((response) => {
                    setCategories(response.data.categories)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        getData()
    }, [])

    const getData = async () => {

        const query = isLoggedIn ? '&user=' + user.id : ""

        await axios
            .get('product?status=pending' + query)
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                const query = isLoggedIn ? '&user=' + user.id : ""

                await axios
                    .get('product' + query)
                    .then((response) => {
                        setProducts(response.data.products)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

            getData()
        }, [])
    );


    return (
        <SafeAreaContainer>

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
                        zIndex: 20,
                        backgroundColor: "#fff",
                        opacity: scrollY.interpolate({
                            inputRange: [0, 200],
                            outputRange: [0, 1],
                        }),
                    }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: Colors.primary,
                    }}
                >
                    OPXA
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Feather name="bell" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.FlatList
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                data={products}
                renderItem={({ item }) => <ProductCard product={item} />}
                keyExtractor={(item, index) => item._id}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-around',
                }}
                ListHeaderComponent={
                    <>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            paddingHorizontal: 20,
                        }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: Colors.primary,
                                }}
                            >
                                OPXA
                            </Text>
                            <Feather name="bell" size={24} color={Colors.primary} />
                        </View>

                        <SearchBar
                            value={search}
                            onChangeText={setSearch}
                            onSubmitEditing={() => console.log('searching for', search)}
                        />
                        <Slider
                            images={IMAGES}
                        />
                        <CategoryList
                            categories={categories}
                        />
                    </>
                }
                showsVerticalScrollIndicator={false}
                // ListEmptyComponent={<EmptyData onPress={getData} text={"No Ads Added Yet"} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                }
            />

        </SafeAreaContainer>
    )
}

const styles = StyleSheet.create({
    stickyHeader: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollHeader: {
        backgroundColor: '#ddd',
    },

})