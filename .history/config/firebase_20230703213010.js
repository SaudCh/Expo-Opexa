import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyCAukR_SsOKADb2N1YmOEyRwFGKWZTwmOo",
    authDomain: "opxa-b11c7.firebaseapp.com",
    projectId: "opxa-b11c7",
    storageBucket: "opxa-b11c7.appspot.com",
    messagingSenderId: "664946986532",
    appId: "1:664946986532:web:121ae4d774d13661a192b1"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
