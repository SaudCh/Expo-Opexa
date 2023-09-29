import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, Animated } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Button } from 'react-native-paper';
import Options from '../../components/account/options';
import { options } from './data';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import useAuth from '../../hooks/useAuth';

export default function Profile() {

    const navigation = useNavigation();
    // const user = auth.currentUser
    const scrollY = new Animated.Value(0);
    const { user, isLoggedIn } = useAuth()


    return (
        isLoggedIn ?
            <SafeAreaView
                style={{
                    paddingTop: Platform.OS === 'android' ? 39 : 0,
                }}
            >
                <Animated.View
                    style={
                        {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 90,
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'flex-end',
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                            zIndex: 20,
                            backgroundColor: "#fff",
                            opacity: scrollY.interpolate({
                                inputRange: [0, 50],
                                outputRange: [0, 1],
                            }),
                        }}
                >
                    <Image
                        source={{ uri: user?.photoURL }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 25,
                        }}
                    />
                    <Text style={styles.heading}>
                        Profile
                    </Text>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                            <Ionicons name="cog-outline" size={24} color={Colors.main} />
                        </TouchableOpacity>
                    </View>

                </Animated.View>

                <Animated.FlatList
                    data={options}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        return (
                            item?.line ?
                                <View
                                    key={index}
                                    style={{
                                        borderBottomColor: 'lightgray',
                                        borderBottomWidth: 1,
                                        marginTop: 10,
                                        marginBottom: 20
                                    }}
                                />
                                : <Options
                                    key={index}
                                    title={item?.title}
                                    screen={item?.screen}
                                    logout={item?.logout ? true : false}
                                >
                                    {item?.icon}
                                </Options>)
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
                                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                                    <Ionicons name="cog-outline" size={24} color={Colors.main} />
                                </TouchableOpacity>
                            </Header>
                            <View style={styles.container}>
                                <View style={styles.infoContainer}>
                                    <Image
                                        source={{ uri: user?.photoURL ? user?.photoURL : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
                                        style={styles.avatar}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user?.name}</Text>
                                        {user?.email && <Text style={{ fontSize: 16, color: 'gray' }}>{user?.email}</Text>}
                                        {user.phoneNumber && <Text style={{ fontSize: 16, color: 'gray' }}>{user?.phoneNumber}</Text>}
                                        <Button
                                            mode="contained"
                                            onPress={() => navigation.navigate('EditProfile')}
                                            style={{ marginTop: 10, backgroundColor: Colors.main, borderRadius: 10 }}
                                        >
                                            Edit Profile
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                        <View
                            style={{
                                height: 200
                            }}
                        >
                            <Options
                                title={"Logout"}
                                logout={true}
                            >
                                <Ionicons name="log-out-outline" size={24} color="red" />
                            </Options>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />

            </SafeAreaView >
            :
            <SafeAreaView
                style={{
                    paddingTop: Platform.OS === 'android' ? 39 : 0,
                }}
            >
                <Animated.View
                    style={
                        {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 90,
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'flex-end',
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                            zIndex: 20,
                            backgroundColor: "#fff",
                            opacity: scrollY.interpolate({
                                inputRange: [0, 50],
                                outputRange: [0, 1],
                            }),
                        }}
                >
                    <Image
                        source={{ uri: user?.photoURL }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 25,
                        }}
                    />
                    <Text style={styles.heading}>
                        Profile
                    </Text>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                            <Ionicons name="cog-outline" size={24} color={Colors.main} />
                        </TouchableOpacity>
                    </View>

                </Animated.View>

                <Animated.FlatList
                    data={options}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        return (
                            item?.line ?
                                <View
                                    key={index}
                                    style={{
                                        borderBottomColor: 'lightgray',
                                        borderBottomWidth: 1,
                                        marginTop: 10,
                                        marginBottom: 20
                                    }}
                                />
                                : <Options
                                    key={index}
                                    title={item?.title}
                                    screen={item?.screen}
                                    logout={item?.logout ? true : false}
                                >
                                    {item?.icon}
                                </Options>)
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
                                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                                    <Ionicons name="cog-outline" size={24} color={Colors.main} />
                                </TouchableOpacity>
                            </Header>
                            <View style={styles.container}>
                                <View style={styles.infoContainer}>
                                    <Image
                                        source={{ uri: user?.photoURL ? user?.photoURL : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
                                        style={styles.avatar}
                                    />
                                </View>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                        <View
                            style={{
                                height: 200
                            }}
                        >
                            <Options
                                title={"Logout"}
                                logout={true}
                            >
                                <Ionicons name="log-out-outline" size={24} color="red" />
                            </Options>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />

            </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    infoContainer: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
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
})