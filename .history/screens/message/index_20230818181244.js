import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import LoginFirst from '../../components/loginFirst';
import useAuth from '../../hooks/useAuth';

export default function MessageScreen() {

    const navigation = useNavigation();
    const { isLoggedIn, profile } = useAuth()

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
                            source={{ uri: 'https://i.pravatar.cc/150?img=10' }}
                        />
                        <View style={styles.headerText}>
                            <Text style={styles.name}>John Doe</Text>
                            <Text style={styles.status}>Active now</Text>
                        </View>
                        <IconButton icon="dots-vertical" />
                    </View>
                    <TouchableOpacity style={styles.message} onPress={chatScreen}>
                        <Image
                            source={{ uri: 'https://picsum.photos/id/237/200/300' }}
                            style={styles.image}
                        />
                        <View style={styles.messageText}>
                            <Text style={styles.messageTitle}>Beautiful sunset</Text>
                            <Text style={styles.messageContent}>Check out this amazing photo I took during my trip to the beach.</Text>
                            <Text style={styles.messageTime}>8:25 PM</Text>
                        </View>
                    </TouchableOpacity>
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

