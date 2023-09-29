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

    const Login = async () => {

        const locationPrm = await getLocationPrm()
        const notificationPrm = await checkPermission()

        if (user) {

            const res = await getDocumentById('users', user.uid)

            if (res.status === 400) {
                return
            }

            if (!res.data?.completed) navigate('CmpProfile')
            else if (!locationPrm) navigate("LocationPrm");
            else if (!notificationPrm) navigate("NotificationPrm");
            else navigate("BottomTabs")

            const token = await AskForPermission()

            if (token) {

                try {

                    console.log(user.uid, token)

                    const devRes = await getDocuments('devices', null, (where("uid", "==", user.uid), where("token", "==", token)))

                    const res = await addDocument("devices", {
                        uid: user.uid,
                        token: token,
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
