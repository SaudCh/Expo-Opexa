import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { Platform } from 'react-native';

export function useNotifications() {

    const checkPermission = async () => {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            if (existingStatus !== 'granted') {
                return false
            } else {
                return true
            }
        }
    }

    const AskForPermission = async () => {

        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                return false
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;

    }

    const deactiveNotification = async () => {
        const token = await AskForPermission()

        const id = await AsyncStorage.getItem('devToken')

        if (!token) {
            return;
        }

        await axios
            .delete('device/' + id)
            .then((response) => {
                console.log(response.data);
            })

    }

    return { checkPermission, AskForPermission, deactiveNotification }
}
