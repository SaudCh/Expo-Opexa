import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { useNotifications } from '../hooks/useNotifications';
import { useCallback, useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';

let logoutTimer;

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigation = useNavigation();
    const { getLocationPrm } = useLocation()
    const { checkPermission, AskForPermission, deactiveNotification } = useNotifications()

    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [timer, setTimer] = useState();
    const [profile, setProfile] = useState({})
    const [wishlist, setWishlist] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (token && timer) {
            const remainingTime = new Date(timer).getTime() - new Date().getTime();
            logoutTimer = setTimeout(Logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, Logout, timer]);

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

            if (!socket) {

                const newSocket = io(process.env.EXPO_PUBLIC_API_URL, {
                    query: {
                        token: token,
                        user: JSON.stringify({
                            email: user.email,
                            id: user.id || user.uid
                        })
                    }
                });

                setSocket(newSocket)

            }


            if (nToken) {

                try {

                    axios.post('device', {
                        deviceToken: nToken,
                        uid: user.id || user.uid
                    })
                        .then(async (res) => {
                            await AsyncStorage.setItem("token", res.data.device._id)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                } catch (error) {
                    console.log(error)
                }
            }

        } else {
            navigate("Landing");
        }

    }, []);

    const Logout = useCallback(async () => {


        deactiveNotification(user.id || user.uid)

        setToken(null);
        setUser(null);
        setTimer(null)
        setProfile({})
        setWishlist([])

        await AsyncStorage.removeItem('@user-data');
        await AsyncStorage.removeItem('@token');

        if (socket) socket.disconnect()


        // navigate("Landing");

    }, []);

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

    const getProfile = useCallback(async () => {
        await axios.get("auth/get-basic-profile")
            .then(res => {

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
                setWishlist(res.data.user.wishlist)
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

    const addToWishlist = async (product) => {
        const prevProducts = [...wishlist]

        setWishlist((prev) => [...prev, product])

        await axios
            .post("wishlist", {
                productId: product
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                setWishlist(prevProducts)
            })

    }

    const removeFromWishlist = async (product) => {
        const prevProducts = [...wishlist]

        setWishlist((prev) => prev.filter(p => p !== product))

        await axios
            .delete(`wishlist/${product}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                setWishlist(prevProducts)
            })
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
                autoLogin,
                wishlist,
                addToWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
