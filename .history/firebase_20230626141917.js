import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBN9bAcHR-W31ZvExkexDauJ8qs8aGqKAc",
    authDomain: "opexa-352d7.firebaseapp.com",
    projectId: "opexa-352d7",
    storageBucket: "opexa-352d7.appspot.com",
    messagingSenderId: "131109289997",
    appId: "1:131109289997:web:eb032aaa6898e1745ad544",
    measurementId: "G-FC0N2TY9GD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);