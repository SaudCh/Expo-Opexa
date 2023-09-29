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
    const [wishlist, setWishlist] = useState([])
    const [socket, setSocket] = useState(null)

    const navigate = (screen) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    }

    const Login = useCallback(async (user, token, expireTime) => {

        if (user.status === 'blocked') {
            // Logout()
            Alert.alert(
                "Account Blocked",
                "Your account has been blocked by the admin",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            // Logout()
                            console.log("OK Pressed");
                        },
                        style: "cancel"
                    },
                ],
                { cancelable: false }
            );

            return
        }


        const expires = expireTime || new Date(new Date().getTime() + 1000 * 60 * 60 * 6)

        setToken(token);
        setUser({
            email: user.email,
            id: user.id || user.uid || user._id,
            expires: expires.toISOString(),
            role: user.role,
            status: user.status,
            completed: user.completed
        });
        setTimer(expires.toISOString())

        const newUser = {
            email: user.email,
            id: user.id || user.uid || user._id,
            expires: expires.toISOString(),
            role: user.role,
            status: user.status,
            completed: user.completed
        }

        const userJSON = JSON.stringify(newUser);
        await AsyncStorage.setItem('@user-data', userJSON);
        await AsyncStorage.setItem('@token', token);

        const locationPrm = await getLocationPrm()
        const notificationPrm = await checkPermission()

        if (user) {

            getProfile()
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

        // navigate("Landing");

    }, []);

    // useEffect(() => {



    //     getData()

    // }, [])

    const autoLogin = async () => {
        const token = await AsyncStorage.getItem('@token');
        const userStr = await AsyncStorage.getItem('@user-data');

        if (!userStr) return navigate("Landing")

        const user = JSON.parse(userStr);

        if (user && token && new Date(user.expires) > new Date()) {
            setToken(token);
            Login(user, token, new Date(user.expires), false)
        } else {
            navigate("Landing")
        }
    }

    useEffect(() => {
        if (token && timer) {
            const remainingTime = new Date(timer).getTime() - new Date().getTime();
            logoutTimer = setTimeout(Logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, Logout, timer]);


    const getProfile = useCallback(async () => {
        await axios.get("auth/get-basic-profile")
            .then(res => {
                console.log('user', res.data.user)

                if (res.data.user.status === 'blocked') {
                    Logout()
                    Alert.alert(
                        "Account Blocked",
                        "Your account has been blocked by the admin",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    // Logout()
                                    console.log("OK Pressed");
                                },
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    );
                }

                setProfile(res.data.user)
                console.log(res.data.user.wishlist)
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
                autoLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
