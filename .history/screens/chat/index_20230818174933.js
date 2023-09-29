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



const App = ({ route }) => {

    const { members } = route.params
    const { user } = useAuth()

    const otherUser = members.find((member) => member._id !== user.id)

    console.log(otherUser)

    const navigation = useNavigation()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const pickImage = async (props) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            props.onSend({ image: result.assets[0].uri });
        }
    };

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const sendImage = async (message, image) => {

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
                                // props.onSend({ image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' }, true);
                                // props.onTextChanged('');
                            }}
                        >
                            <Feather name="camera" size={24} color={Colors.main} />
                        </TouchableOpacity>

                }
            </View>

        )

    }

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
                paddingTop: 40,
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
                <Avatar.Image size={40} source={{ uri: getAvatar(otherUser?.avatar) }} />
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
                    _id: 1,
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