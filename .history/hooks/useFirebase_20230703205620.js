import { initializeApp } from "firebase/app"
import {
    doc as firebaseDoc,
    query as firebaseQuery,
    collection,
    getFirestore,
    setDoc as firebaseSetDoc,
    addDoc as firebaseAddDoc,
    getDoc as firebaseGetDoc,
    getDocs as firebaseGetDocs,
    deleteDoc as firebaseDeleteDoc,
    updateDoc as firebaseUpdateDoc,
    onSnapshot as firebaseOnSnapshot,
    serverTimestamp as firebaseServerTimestamp,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getFunctions, httpsCallable } from "firebase/functions"
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import * as ImageManipulator from "expo-image-manipulator"

import { firebaseConfig as firebase } from "../config/firebase"
import { getDatabase } from "firebase/database"

export default function useFirebase() {
    const app = initializeApp(firebase)
    const auth = getAuth(app)
    const database = getDatabase(app)
    const db = getFirestore(app)
    const functions = getFunctions(app)
    const storage = getStorage()

    const doc = (collectionName, docId) => {
        return firebaseDoc(db, collectionName, docId)
    }

    const singleQuery = (collectionName, where) => {
        return firebaseQuery(collection(db, collectionName), where)
    }

    const addDoc = (collectionName, data) => {
        return firebaseAddDoc(collection(db, collectionName), data)
    }

    const getDoc = (collectionName, docId) => {
        return firebaseGetDoc(doc(collectionName, docId))
    }

    const getDocs = (collectionName, where, setData) => {
        // where should be a firebase query "where" function
        // e.g: where("capital", "==", true)

        const q = singleQuery(collectionName, where)

        firebaseGetDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setData((prev) => [
                    ...prev,
                    {
                        id: doc.id,
                        ...doc.data(),
                    },
                ])
            })
        })
    }

    const onSnapshotDoc = (
        collectionName,
        docId = "",
        setData,
        setLoading = null
    ) => {
        const unsubscribe = firebaseOnSnapshot(
            doc(collectionName, docId),
            (doc) => {
                if (doc.exists()) setData(doc.data())
                if (setLoading) setLoading(false)
            }
        )
        return unsubscribe
    }

    const onSnapshotQuery = (query, setData, setLoading = null) => {
        let temp = []

        const unsubscribe = firebaseOnSnapshot(query, (querySnapshot) => {
            temp = []

            querySnapshot.forEach((doc) => {
                temp.push({ id: doc.id, ...doc.data() })
            })

            setData(temp)
            if (setLoading) setLoading(false)
        })

        return unsubscribe
    }

    const setDoc = (collectionName, docId, data) => {
        return firebaseSetDoc(doc(collectionName, docId), data)
    }

    const deleteDoc = (collectionName, docId) => {
        return firebaseDeleteDoc(doc(collectionName, docId))
    }

    const updateDoc = (collectionName, docId, data) => {
        return firebaseUpdateDoc(doc(collectionName, docId), data)
    }

    const serverTimestamp = () => {
        return firebaseServerTimestamp()
    }

    const callable = (functionName, data) => {
        return httpsCallable(functions, functionName)(data)
    }

    const collectionSnapshot = (collectionName, setData, setLoading = null) => {
        let temp = []

        const unsubscribe = firebaseOnSnapshot(
            collection(db, collectionName),
            (querySnapshot) => {
                temp = []
                querySnapshot.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
                })

                setData(temp)
                if (setLoading) setLoading(false)
            }
        )

        return unsubscribe
    }

    const uploadImages = async (images) => {
        const imagesL = []

        for (let i = 0; i < images.length; i++) {
            try {
                const { height, width, uri } = images[i]

                const result = await ImageManipulator.manipulateAsync(
                    uri,
                    [{ resize: { width: width / 2.5, height: height / 2.5 } }],
                    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
                )

                const blob = await fetch(result.uri).then((res) => res.blob())
                const storageRef = ref(storage, "/images/" + new Date().getTime())
                const snapshot = await uploadBytes(storageRef, blob)
                const link = await getDownloadURL(snapshot.ref)
                imagesL.push(link)
            } catch (ex) {
                ex.message = "Upload Image Error: " + ex.message
                throw new Error(ex)
            }
        }

        return imagesL
    }

    const uploadImageAsync = async (image) => {
        try {
            const { height, width, uri } = image

            const result = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: width / 2.5, height: height / 2.5 } }],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            )

            const blob = await fetch(result.uri).then((res) => res.blob())
            const storageRef = ref(storage, "/images/" + new Date().getTime())
            const snapshot = await uploadBytes(storageRef, blob)
            return await getDownloadURL(snapshot.ref)
        } catch (ex) {
            ex.message = "Upload Image Error: " + ex.message
            throw new Error(ex)
        }
    }

    const getImageURL = async (imagePath) => {
        // const url = await getDownloadURL(ref(storage, imagePath));
        // console.log(url);
        // return url;
        return await getDownloadURL(ref(storage, imagePath))
    }

    return {
        db,
        doc,
        auth,
        getDoc,
        addDoc,
        setDoc,
        getDocs,
        updateDoc,
        deleteDoc,
        onSnapshotDoc,
        onSnapshotQuery,
        collection,
        singleQuery,
        serverTimestamp,
        callable,
        uploadImages,
        getImageURL,
        collectionSnapshot,
        uploadImageAsync
    }
}
