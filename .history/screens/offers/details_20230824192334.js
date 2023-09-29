import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { Alert, BackHandler, TextInput, TouchableOpacity, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
// import { CameraIcon, SendIcon } from '../components/Icons/icons';
import { Platform } from 'react-native';
import { Colors } from '../../constants/colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Avatar, Menu } from 'react-native-paper';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import { getAvatar } from '../../utils/getAvatar';
import axios from 'axios';
import useApi from '../../hooks/useApi';
import { getImageUrl } from '../../utils/getImageUrl';



const App = ({ route }) => {

    const { members = [], chatId } = route.params
    const { user, profile, socket } = useAuth()

    const otherUser = members.find((member) => member._id !== user.id)
    const { uploadImage } = useApi()

    // console.log(otherUser)

    const navigation = useNavigation()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newChat, setNewChat] = useState(false);
    const [visible, setVisible] = useState(false);

    const pickImage = async (props) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            sendImage(result)
        }
    };

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        await axios.post('bid/messages', {
            chatId,
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
            image: image.uri,
            user: {
                _id: user.id,
                name: profile.name,
            },
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]))

        const res = await uploadImage('image', image, setLoading)

        if (res.status !== 200) {

            Alert.alert('Error', res.message)
            return
        }

        await axios.post('bid/messages', {
            chatId,
            image: getImageUrl(res.image),
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

            await axios.get('bid/messages/' + chatId)
                .then(res => {
                    setMessages(res.data.messages)
                })
                .catch(err => console.log(err))

        }

        getMessages()

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            if (!socket) return

            socket.on('chat:message', (data) => {
                console.log(data)

                if (data.chatId !== chatId) return

                setMessages(previousMessages => GiftedChat.append(previousMessages, data))

            })

            return () => socket.off('chat:message')
        }, [])
    );

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
                justifyContent: 'space-between',
                paddingTop: 45,
                backgroundColor: Colors.main,
                paddingHorizontal: 10,
                paddingBottom: 5,
            }} >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
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
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={<TouchableOpacity
                        onPress={() => setVisible(true)}
                        style={{
                            alignSelf: 'flex-end',
                        }}
                    >
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>

                    }>
                    <Menu.Item onPress={() => { }} title="Complete" />
                    <Menu.Item onPress={() => { }} title="Issue" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
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
                showUserAvatar={false}

            />
        </View>
    );
}

export default App;