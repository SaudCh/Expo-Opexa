import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react'
import { Animated, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Slider from '../../components/slider';
import SafeAreaContainer from '../../components/safeAreaContainer';
import ProductCard from '../../components/card';
import SearchBar from '../../components/SearchBar';
import { Colors } from '../../constants/colors';
import CategoryList from '../../components/categories';
import useAuth from '../../hooks/useAuth';


const IMAGES = [
    { url: 'http://www.property2day.com/images/selling-banner.jpg' },
    { url: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-promotion-facebook-cover-banner-design-template-904fb96ddd27f584e4da597e920ef22d_screen.jpg?ts=1630013522' },
];


export default function Home({ route }) {

    const navigation = useNavigation()

    const { user, isLoggedIn } = useAuth()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState(route.params.search)
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
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                const query = isLoggedIn ? '?user=' + user.id : ""

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

    const getData = async () => {

        const query = isLoggedIn ? '?user=' + user.id : ""

        await axios
            .get('product' + query)
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <SafeAreaContainer>

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
                        <SearchBar
                            value={search}
                            onChangeText={setSearch}
                            onSubmitEditing={() => console.log('searching for', search)}
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