import { useNavigation } from '@react-navigation/native';
import { where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

import { Alert } from 'react-native';
import { useLocation } from './useLocation';
import { useNotifications } from './useNotifications';
import decodeFirebaseError from '../config/decodeFirebaseError';
import { auth } from '../config/firebase';
import useFirebase from './useFirebase';


export function useAuth() {

    const { checkPermission, AskForPermission, deactiveNotification } = useNotifications()
    const navigation = useNavigation();
    const { getLocationPrm } = useLocation()

    const navigate = (screen) => {
        if (navigation.canGoBack()) {
            navigation.popToTop();
        }
        navigation.replace(screen)
    }

    const Login = async (user, token, expireTime) => {

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

        if (user) {

            const res = await getDocumentById('users', user.id)

            if (res.status === 400) {
                return
            }

            if (!res.data?.completed) navigate('CmpProfile')
            else if (!locationPrm) navigate("LocationPrm");
            else if (!notificationPrm) navigate("NotificationPrm");
            else navigate("BottomTabs")

            const nToken = await AskForPermission()

            if (nToken) {

                try {

                    console.log(user.uid, nToken)

                    const devRes = await getDocuments('devices', null, (where("uid", "==", user.uid), where("token", "==", nToken)))

                    const res = await addDocument("devices", {
                        uid: user.uid,
                        token: nToken,
                    })

                    if (res.status === 400) {
                        throw new Error(res.error)
                    }

                } catch (error) {
                    console.log(error)
                }
            }

        } else {
            navigation.replace("Landing");
        }

    }

    const Logout = async () => {

        deactiveNotification(auth.currentUser.uid)

        signOut(auth).then(() => {
            navigation.replace("Login")
            // navigate('Login')
        }).catch((error) => {
            console.log(error)
        });

    }

    return { Login, Logout }
}
