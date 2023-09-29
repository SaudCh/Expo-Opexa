import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { Alert, BackHandler, TextInput, TouchableOpacity, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
// import { CameraIcon, SendIcon } from '../components/Icons/icons';
import { Platform } from 'react-native';
import { Colors } from '../../constants/colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import { getAvatar } from '../../utils/getAvatar';
import axios from 'axios';
import useApi from '../../hooks/useApi';



const App = ({ route }) => {

    const { members, chatId, altChatId } = route.params
    const { user, profile } = useAuth()

    const otherUser = members.find((member) => member._id !== user.id)
    const { uploadImage } = useApi()

    console.log(otherUser)

    const navigation = useNavigation()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newChat, setNewChat] = useState(false);

    const pickImage = async (props) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            sendImage(props, result.uri)
        }
    };

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        console.log("oid", otherUser._id)

        await axios.post('chat/send-message', {
            chatId,
            altChatId,
            text: messages[0].text,
            senderId: user.id,
            receiverId: otherUser._id,
            user: {
                _id: user.id,
                name: profile.name,
            }
        })


    }, []);

    const sendImage = async (image) => {

        const msg = {
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            image: image,
            user: {
                _id: user.id,
                name: profile.name,
            },
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]))

        const res = await uploadImage('image', image, setLoading)

        if (res.status !== 200) {
            // Alert.alert('Error', res.message)
            return
        }

        await axios.post('chat/send-image', {
            chatId,
            altChatId,
            image: res.image,
            senderId: user.id,
            receiverId: otherUser._id,
            user: {
                _id: user.id,
                name: profile.name,
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    const renderInputToolbar = (props) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TextInput
                    placeholder="Type your message here..."
                    style={{
                        borderColor: 'black',
                        padding: 10,
                        margin: 10,
                        borderRadius: 20,
                        width: '80%',
                        backgroundColor: 'white',
                    }}
                    value={props.text}
                    onChangeText={(text) => {
                        props.onTextChanged(text);
                    }}
                />
                {
                    props.text.length > 0 ?

                        <TouchableOpacity
                            // title="Send"
                            onPress={() => {
                                props.onSend({ text: props.text || '' }, true);
                                props.onTextChanged('');
                            }}
                        >
                            <Ionicons name="send" size={24} color={Colors.main} />
                        </TouchableOpacity>

                        :

                        <TouchableOpacity
                            onPress={() => {
                                pickImage(props)
                            }}
                        >
                            <Feather name="camera" size={24} color={Colors.main} />
                        </TouchableOpacity>

                }
            </View>

        )

    }

    useEffect(() => {

        const getMessages = async () => {

            await axios.get('chat/get-chat/' + chatId + '?alt=' + altChatId)
                .then(res => {
                    if (!res.data.chat) {
                        setNewChat(true)
                        return
                    }
                    setMessages(res.data.messages)
                })
                .catch(err => console.log(err))

        }

        getMessages()

    }, [])

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(43, 82, 98, 0.2)',
                paddingBottom: Platform.OS === 'ios' ? 0 : 40,
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 45,
                backgroundColor: Colors.main,
                paddingHorizontal: 10,
                paddingBottom: 5,
            }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{
                        marginRight: 20,
                    }}
                >
                    <Entypo name="chevron-thin-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Avatar.Image size={40} source={getAvatar(otherUser?.avatar)} />
                <View
                    style={{
                        marginLeft: 20,
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: 'white',
                    }}>
                        {otherUser?.name}
                    </Text>
                </View>
            </View>

            <GiftedChat
                messages={messages}
                alwaysShowSend
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user.id,
                }}
                renderInputToolbar={renderInputToolbar}
                renderAvatar={null}
                renderUsernameOnMessage={true}
                showUserAvatar={true}

            />
        </View>
    );
}

export default App;