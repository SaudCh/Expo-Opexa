import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Modal, TouchableOpacity, View, Animated, Image } from 'react-native'
import Header from '../../components/header';
import { Colors } from '../../constants/colors';
import { getAvatar } from '../../utils/getAvatar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';

export default function RNModal({
    visible,
    onDismiss,
    user
}) {

    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    const [profile, setProfile] = useState({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getData = async () => {
            await axios
                .get('user/seller-profile/' + user)
                .then((res) => {
                    console.log(res.data)
                    setProfile(res.data.user)
                    setProducts(res.data.products)
                })
                .finally(() => {
                    console.log('finally')
                })
        }
        getData()
    }, [])

    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            animationType='slide'
        >
            <View style={{
                paddingTop: 50,
            }}
            >

                <Animated.FlatList
                    data={products}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        return (<RenderProductItem
                            item={item}
                            onPress={() => navigation.navigate('ProductDetails', { item })}
                        />)
                    }
                    }
                    contentContainerStyle={{
                        paddingTop: 0,
                        padding: 10
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <>
                            <Header
                                title="Profile"
                            >
                                <TouchableOpacity
                                    onPress={() => onDismiss()}
                                >
                                    <AntDesign name="close" size={24} color={Colors.primary} />
                                </TouchableOpacity>
                            </Header>
                            <View style={styles.container}>
                                <View style={styles.infoContainer}>
                                    <Image
                                        source={getAvatar(profile?.avatar)}
                                        style={styles.avatar}
                                    />
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{profile?.name}</Text>
                                        {profile?.email && <Text style={{ fontSize: 16, color: 'gray' }}>{profile?.email}</Text>}
                                        {profile?.phoneNumber && <Text style={{ fontSize: 16, color: 'gray' }}>{profile?.phoneNumber}</Text>}
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Modal>
    )
}

const RenderProductItem = ({ item, onPress, deleteProduct, editProduct }) => {
    console.log(item)

    const [visible, setVisible] = React.useState(false);

    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={onPress}
        >
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
                <Text style={styles.itemPrice}>{item.description.substr(0, 80)}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    infoContainer: {
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Circular',
        color: Colors.main
    },
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
        right: 10,
        backgroundColor: 'transparent',
        zIndex: 10,
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
})