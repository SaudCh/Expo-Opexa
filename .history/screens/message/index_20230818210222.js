import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Platform, FlatList, RefreshControl } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import LoginFirst from '../../components/loginFirst';
import useAuth from '../../hooks/useAuth';
import { getAvatar } from '../../utils/getAvatar';
import axios from 'axios';

export default function MessageScreen() {

    const navigation = useNavigation();
    const { isLoggedIn, profile, user, socket } = useAuth()
    const [messages, setMessages] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const getChat = async () => {
        await axios
            .get('chat/get-chat-list?userId=' + user.id)
            .then((res) => {
                setMessages(res.data.chatList)
            })

    }

    useFocusEffect(
        React.useCallback(() => {
            if (!isLoggedIn) return
            getChat();
        }, [])
    );

    const chatScreen = (data) => {
        navigation.navigate('Chat', data);
    }

    // useEffect(() => {
    //     if (!socket) return

    //     socket.on('chat:message', (data) => {
    //         console.log(data)
    //     })

    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            if (!socket) return

            socket.on('chat:allchats', (data) => {
                console.log(data)

            })

            return () => socket.off('chat:allchats')
        }, [])
    );

    return (

        isLoggedIn ?
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? 39 : 0
            }}>
                <View style={styles.container}>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            const ou = item.members.find((m) => m._id !== user.id)

                            return (
                                <TouchableOpacity style={styles.message} onPress={() => chatScreen({
                                    chatId: item.chatId,
                                    members: item.members,
                                    altChatId: item.altChatId,
                                })}>
                                    <Image
                                        source={getAvatar(ou?.avatar)}
                                        style={styles.image}
                                    />
                                    <View style={styles.messageText}>
                                        <Text style={styles.messageTitle}>{ou.name}</Text>
                                        <Text style={styles.messageContent}>{item.lastMessage}</Text>
                                        <Text style={styles.messageTime}>{messageDate(item.updatedAt)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={getChat} />
                        }
                        ListHeaderComponent={
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
                        }
                    />
                </View>
            </SafeAreaView>
            :
            <LoginFirst text="You need to login first to view your message" />

    );
}

const messageDate = (inputDate) => {
    const now = new Date(); // Current date and time
    const date = new Date(inputDate); // Input date

    // Check if input date is greater than today's 00:00
    if (date > new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        // Return the time in HH:MM format
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else if (
        date.toDateString() ===
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString()
    ) {
        // Return "Yesterday" if input date is yesterday
        return 'Yesterday';
    } else {
        // Return the full date in DD/MM/YYYY format
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

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
        width: 60,
        height: 60,
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

