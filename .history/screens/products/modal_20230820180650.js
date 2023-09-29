import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import React from 'react'
import { StyleSheet, Text, Modal, TouchableOpacity, View, Animated, Image } from 'react-native'
import Header from '../../components/header';
import { Colors } from '../../constants/colors';
import { getAvatar } from '../../utils/getAvatar';
import { useNavigation } from '@react-navigation/native';

export default function RNModal({
    visible,
    onDismiss,
    user
}) {

    const profile = {}
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()

    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            animationType='slide'
        >
            <TouchableOpacity
                onPress={() => onDismiss()}
                style={{
                    position: 'absolute',
                    top: 50,
                    right: 20,
                }}
            >
                <AntDesign name="close" size={24} color="#000" />
            </TouchableOpacity>

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
                            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                                <Ionicons name="cog-outline" size={24} color={Colors.main} />
                            </TouchableOpacity>
                        </Header>
                        <View style={styles.container}>
                            <View style={styles.infoContainer}>
                                <Image
                                    source={getAvatar(profile?.avatar)}
                                    style={styles.avatar}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{profile?.name}</Text>
                                    {user?.email && <Text style={{ fontSize: 16, color: 'gray' }}>{user?.email}</Text>}
                                    {user?.phoneNumber && <Text style={{ fontSize: 16, color: 'gray' }}>{user?.phoneNumber}</Text>}
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
                showsVerticalScrollIndicator={false}
            />

        </Modal>
    )
}

const styles = StyleSheet.create({})