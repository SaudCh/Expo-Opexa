import { useNavigation } from '@react-navigation/native';
import firebase from '../config/firebase';
import { useAuth } from './useAuth';


export function useSocialLogin() {

    const navigation = useNavigation()
    const { Login } = useAuth()

    const phoneLogin = async ({ phoneNumber, recaptchaVerifier }, setLoading) => {

        if (phoneNumber.length < 13) {
            alert("Please enter valid phone number")
            return
        }

        try {

            if (setLoading) setLoading(true)

            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            )

            navigation.navigate("OTPScreen", {
                verificationId: verificationId ? verificationId : "",
                phoneNumber: phoneNumber ? phoneNumber : ""
            })

            if (setLoading) setLoading(false)


        } catch (err) {
            if (setLoading) setLoading(false)
            alert(err.message)
        }

    };

    const VerifyPhoneOtp = async ({ verificationId, otp }, setLoading) => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            otp
        );

        if (setLoading) setLoading(true)

        try {

            const user = await firebase.auth().signInWithCredential(credential)

            if (user) {
                // check is user exist or not 
                const userRef = firebase.firestore().collection('users').doc(user.user.uid)
                const doc = await userRef.get()
                if (!doc.exists) {
                    // create new user
                    await userRef.set({
                        name: user.user.displayName,
                        phone: user.user.phoneNumber,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        completed: false
                    })

                }

                Login()
            }

        } catch (error) {
            alert(error.message)
        }

        if (setLoading) setLoading(false)


    }

    return { phoneLogin, VerifyPhoneOtp }

}