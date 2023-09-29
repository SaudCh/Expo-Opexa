import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { useNotifications } from '../hooks/useNotifications';
import { useCallback, useState, useEffect, createContext } from 'react';
import * as Font from "expo-font";

let logoutTimer;

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const { checkPermission, AskForPermission, deactiveNotification } = useNotifications()
    const navigation = useNavigation();
    const { getLocationPrm } = useLocation()
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [timer, setTimer] = useState();
    const [profile, setProfile] = useState({})
    const [socket, setSocket] = useState(null)

    const navigate = (screen) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    }

    const Login = useCallback(async (user, token, expireTime, route = true) => {

        const expires = expireTime || new Date(new Date().getTime() + 1000 * 60 * 60 * 6)

        setToken(token);
        setUser(user);
        setTimer(expires.toISOString())

        const newUser = {
            email: user.email,
            id: user.id || user.uid || user._id,
            expires: expires.toISOString(),
            role: user.role,
            status: user.status
        }

        const userJSON = JSON.stringify(newUser);
        await AsyncStorage.setItem('@user-data', userJSON);
        await AsyncStorage.setItem('@token', token);

        const locationPrm = await getLocationPrm()
        const notificationPrm = await checkPermission()

        if (user && route) {

            if (!user.completed) navigate('CmpProfile')
            else if (!locationPrm) navigate("LocationPrm");
            else if (!notificationPrm) navigate("NotificationPrm");
            else navigate("BottomTabs")

            const nToken = await AskForPermission()

            if (nToken) {

                try {

                    // const devRes = await getDocuments('devices', null, (where("uid", "==", user.id), where("token", "==", nToken)))

                    // const res = await addDocument("devices", {
                    //     uid: user.id,
                    //     token: nToken,
                    // })

                    // if (res.status === 400) {
                    //     throw new Error(res.error)
                    // }

                } catch (error) {
                    console.log(error)
                }
            }

        } else {
            navigate("Landing");
        }

    }, []);

    const Logout = useCallback(async () => {


        setToken(null);
        setUser(null);
        setTimer(null)
        setProfile({})

        await AsyncStorage.removeItem('@user-data');
        await AsyncStorage.removeItem('@token');

        // if (socket) socket.disconnect()

        navigate("Landing");

    }, []);

    useEffect(() => {

        const getData = async () => {
            const token = await AsyncStorage.getItem('@token');
            const userStr = await AsyncStorage.getItem('@user-data');

            if (!userStr) return

            const user = JSON.parse(userStr);

            if (user && token && new Date(user.expires) > new Date()) {
                setToken(token);
                Login(user, token, new Date(user.expires))
            }
        }

        getData()

    }, [])

    useEffect(() => {
        if (token && timer) {
            const remainingTime = new Date(timer).getTime() - new Date().getTime();
            logoutTimer = setTimeout(Logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, Logout, timer]);


    const getProfile = useCallback(async () => {
        await axios.get("user/profile")
            .then(res => {
                setProfile(res.data.user)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const getLoggedIn = async () => {
        const token = await AsyncStorage.getItem('@token');
        const userStr = await AsyncStorage.getItem('@user-data');

        if (!userStr) return {}

        const user = JSON.parse(userStr);

        if (user && token && new Date(user.expires) > new Date()) {
            return user
        }

        return {}
    }

    // return { Login, Logout, getProfile, getLoggedIn }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                Login,
                Logout,
                getProfile,
                getLoggedIn,
                token,
                user,
                profile,
                socket,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
