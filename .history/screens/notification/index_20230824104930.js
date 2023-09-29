import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import useAuth from '../../hooks/useAuth';
import LoginFirst from '../../components/loginFirst';

const NotificationScreen = () => {

    const { isLoggedIn, user } = useAuth()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {

        if (!isLoggedIn) return setNotifications([])

        const getNotifications = async () => {
            await axios
                .get('notification/' + user.id)
                .then((res) => {
                    setNotifications(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getNotifications()

    }, [isLoggedIn])


    return (isLoggedIn ? <View style={styles.container}>
        {
            notifications.map((notification) => (
                <TouchableOpacity key={notification.id} style={styles.notificationContainer}>
                    <View style={styles.notificationIcon}>
                        <Ionicons name="notifications-outline" size={30} color="black" />
                    </View>
                    <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        <Text style={styles.notificationDescription}>{notification.body}</Text>
                    </View>
                </TouchableOpacity>
            ))
        }
    </View> :
        <LoginFirst
            text="You need to be logged in to view notifications"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 12,
    },
    notificationIcon: {
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationDescription: {
        fontSize: 16,
        marginTop: 4,
    },
});

export default NotificationScreen;
