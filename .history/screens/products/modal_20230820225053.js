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

export default function RNModal({
    visible,
    onDismiss,
    user
}) {

    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const getData = async () => {
            await axios
                .get('user/seller-profile/' + user)
                .then((res) => {
                    console.log(res.data)
                    setProfile(res.data.user)

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
                    data={[]}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        return (<View />)
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
                                    <View style={{ marginLeft: 10, textAlign: 'center' }}>
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
})