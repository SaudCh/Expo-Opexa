import { Animated, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { db } from '../../config/firebase';


const IMAGES = [
    { url: 'http://www.property2day.com/images/selling-banner.jpg' },
    { url: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-promotion-facebook-cover-banner-design-template-904fb96ddd27f584e4da597e920ef22d_screen.jpg?ts=1630013522' },
];


export default function Home() {

    const navigation = useNavigation()

    return (
        <SafeAreaContainer>

            <Text style={{
                fontSize: 16,
                // light color
                color: '#666',
                paddingHorizontal: 20,
                paddingBottom: 10,

            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={{
                fontSize: 16,
                // light color
                color: '#666',
                paddingHorizontal: 20,
                paddingBottom: 10,

            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>

            <Button
                mode="contained"
                style={{
                    margin: 20,
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                }}
                onPress={() => navigation.navigate('SelectCategory', {
                    expert: true
                })}
            >
                List Your Product
            </Button>

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