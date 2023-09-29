import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import LoginFirst from '../../components/loginFirst';
import useAuth from '../../hooks/useAuth';
import { getAvatar } from '../../utils/getAvatar';
import axios from 'axios';

export default function MessageScreen() {

    const navigation = useNavigation();
    const { isLoggedIn, profile, user } = useAuth()
    const [messages, setMessages] = React.useState([]);

    const getChat = async () => {
        await axios
            .get('chat/get-chat-list?userId=' + user.id)
            .then((res) => {

                setMessages(res.data.chatList)

                // setMessages(res.data.messages)
            }
            )

    }

    useFocusEffect(
        React.useCallback(() => {
            getChat();
        }
            , [])
    );

    const chatScreen = () => {
        navigation.navigate('Chat');
    }

    return (

        isLoggedIn ?
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? 39 : 0
            }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Avatar.Image
                            size={50}
                            source={getAvatar(profile?.avatar)}
                        />
                        <View style={styles.headerText}>
                            <Text style={styles.name}>{profile?.name}</Text>
                            <Text style={styles.status}>Active now</Text>
                        </View>
                        {/* <IconButton icon="dots-vertical" /> */}
                    </View>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            console.log(item)

                            const ou = item.members.find((m) => m.id !== user.id)

                            return (
                                <TouchableOpacity style={styles.message} onPress={chatScreen}>
                                    <Image
                                        source={getAvatar(ou?.avatar)}
                                        style={styles.image}
                                    />
                                    <View style={styles.messageText}>
                                        <Text style={styles.messageTitle}>{ou.name}</Text>
                                        <Text style={styles.messageContent}>{item.lastMessage}</Text>
                                        <Text style={styles.messageTime}>{item.createdAt}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </SafeAreaView>
            :
            <LoginFirst text="You need to login first to view your message" />

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        marginBottom: 10,
    },
    headerText: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    status: {
        fontSize: 14,
        color: 'gray',
    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    messageText: {
        flex: 1,
    },
    messageTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageContent: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        marginBottom: 5,
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
    },
});

