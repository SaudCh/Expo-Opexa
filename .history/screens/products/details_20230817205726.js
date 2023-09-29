import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, TextInput, FlatList, Dimensions, Alert } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import LocationInfo from '../../components/ProductDetail/Location';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import axios from 'axios';
import { auth, db } from '../../config/firebase';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import useAuth from '../../hooks/useAuth';
import { getImageUrl } from '../../utils/getImageUrl';
import useWishlist from '../../hooks/useWishlist';
import { dateFormat } from '../../utils/dateTime';
import { getAvatar } from '../../utils/getAvatar';

const ProductDetailScreen = ({ route }) => {
    const auth = useAuth()
    const { isWishlisted } = useWishlist()
    const { title, price, images, description, location, userInfo, id, user, expert } = route.params.product;

    console.log(user)

    const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const navigation = useNavigation()


    const scrollY = new Animated.Value(0);


    const [loading, setLoading] = useState(false)

    return (
        <>
            <View style={{
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
                zIndex: 10,
            }}>

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
                            backgroundColor: "#fff",
                            opacity: scrollY.interpolate({
                                inputRange: [0, 300],
                                outputRange: [0, 1],
                            }),
                        }}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                    }}
                >
                    <Ionicons name="chevron-back" size={40} color={Colors.primary} />
                </TouchableOpacity>

                {
                    auth?.user?.id !== user?._id &&
                    <>
                        {
                            isWishlisted(id) ?

                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AntDesign name="heart" size={24} color={Colors.primary} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!auth.isLoggedIn) return

                                    }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AntDesign name="hearto" size={24} color={Colors.primary} />
                                </TouchableOpacity>
                        }
                    </>
                }
            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                style={styles.container}
            >
                {/* header bar */}

                <View
                    style={{
                        overflow: 'hidden',
                        marginTop: -1000,
                        paddingTop: 1000,
                        alignItems: "center"
                    }}
                >
                    <FlatList
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <Animated.Image
                                        source={{ uri: getImageUrl(item) }}
                                        style={{
                                            width: Dimensions.get('window').width,
                                            height: 300,
                                            resizeMode: 'contain',
                                            transform: [
                                                {
                                                    translateY: scrollY.interpolate({
                                                        inputRange: [-300, 0, 300],
                                                        outputRange: [-300 / 2, 0, 300 * 0.75],
                                                    }),
                                                },
                                                {
                                                    scale: scrollY.interpolate({
                                                        inputRange: [-300, 0, 300],
                                                        outputRange: [2, 1, 0.75],
                                                    }),
                                                },
                                            ],
                                        }}

                                    />
                                    {
                                        expert && (
                                            <View style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                            }}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    color: '#fff',
                                                    fontWeight: 'semibold',
                                                }}>Expert</Text>
                                            </View>
                                        )
                                    }
                                </>
                            );
                        }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>{formatCurrencyPKR(price)}</Text>

                    <View
                        style={[styles.detailContainer, {
                            marginTop: 20
                        }]}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                            Details
                        </Text>

                        {/* Detail options */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 5,
                        }}>
                            <Text style={{ fontSize: 16 }}>Condition</Text>
                            <Text style={{ fontSize: 16 }}>New</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 5,
                        }}>
                            <Text style={{ fontSize: 16 }}>Model</Text>
                            <Text style={{ fontSize: 16 }}>Iphone</Text>
                        </View>
                    </View>

                    {/* <View
                        style={styles.detailContainer}
                    >
                        <Text style={styles.heading}>Bidding</Text>
                        <View style={styles.bidContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                                <AntDesign name="minus" size={24} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.bidInput}
                                keyboardType="numeric"
                                placeholder="Enter your bid"
                                value={bidAmount.toString()}
                                onChangeText={(text) => setBidAmount(Number(text))}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                                <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    {
                        user._id !== auth?.user?.id ?
                            <>
                                {
                                    expert &&
                                    <TouchableOpacity style={styles.placeBidButton} onPress={() => {
                                        if (user === auth.currentUser.uid) {
                                            return
                                        }

                                        Alert.alert(
                                            "Place Bid",
                                            "1000pkr will be deducted from your wallet. Are you sure you want to place bid?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "OK", onPress: () => {
                                                        navigation.navigate('Barter', {
                                                            // name: product?.name,
                                                            product: route.params.product
                                                        })
                                                    }
                                                }
                                            ],
                                        );
                                    }}>
                                        {
                                            loading ? <ActivityIndicator size="small" color="#fff" /> :
                                                <Text style={styles.placeBidText}>Place Bid</Text>
                                        }
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={styles.chatBtn}>
                                    <Text style={styles.chatBtnText}>
                                        Message Seller
                                    </Text>
                                </TouchableOpacity>

                            </>
                            :
                            <>
                                <TouchableOpacity style={styles.chatBtn}>
                                    <Text style={styles.chatBtnText}>
                                        Edit Product
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.chatBtn, { borderColor: 'red' }]}>
                                    <Text style={[styles.chatBtnText, { color: 'red' }]}>
                                        Delete Product
                                    </Text>
                                </TouchableOpacity>
                            </>
                    }

                    <View
                        style={styles.detailContainer}
                    >
                        <Animated.Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                            Description
                        </Animated.Text>
                        <Text style={styles.description}>
                            {description.substring(0, 100) + '...'}
                        </Text>

                        <TouchableOpacity
                            // onPress={() => setDes(!des)}
                            style={{
                                alignSelf: "flex-end"
                            }}
                        >
                            <Text style={styles.readMore}>
                                {'Read More'}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.profileContainer}>
                        <Image
                            source={getAvatar(user?.avatar)}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileTextContainer}>
                            <Text style={styles.profileName}>{user?.name}</Text>
                            <Text style={styles.memberSince}>Member since: {dateFormat(user?.createdAt)}</Text>
                            <Text style={styles.seeProfile}>See Profile</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={24} color="#666" />
                    </View>

                    <View
                        style={{
                            height: 300,
                            overflow: "hidden",
                            position: "relative"
                        }}
                    >
                        <LocationInfo
                            location={location}
                        />
                    </View>
                    <View
                        style={{
                            height: 100
                        }}
                    />
                </View>
            </Animated.ScrollView>
            {/* <View style={[styles.bottomContainer, {

            }]}>
                <Button
                    mode="contained"
                    onPress={() => {
                        if (user === auth.currentUser.uid) {
                            return
                        }
                        navigation.navigate('Barter', {
                            // name: product?.name,
                            product: route.params.product
                        })
                    }}
                    style={{
                        width: '45%',
                    }}
                >
                    Bid
                </Button>
                 <Button
                    mode="outlined"
                    onPress={() => { }}
                    style={{
                        borderColor: Colors.primary
                    }}
                >
                    Trade
                </Button>
                <Button
                    mode="contained"
                    onPress={() => { }}
                    style={{
                        width: '45%',
                    }}
                >
                    Chat
                </Button>
            </View> */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
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
