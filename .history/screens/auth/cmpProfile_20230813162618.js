import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import EditAvatar from '../../components/account/editAvatar'
import { Button, TextInput } from 'react-native-paper'
import { Colors } from '../../constants/colors'
import { PaperInput } from '../../components/Inputs'
import useFirebase from '../../hooks/useFirebase'
import SubmitButton from '../../components/SubmitButton'
// import { useAuth } from '../../hooks/useAuth'
import { updateProfile } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../config/firebase'

export default function CmpProfile() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
    })
    const [errors, setError] = useState({})
    const { updateDocument, uploadImage } = useFirebase()
    // const { Login } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const handleSubmit = async () => {

        const errors = Validate(data);

        setError(errors);
        if (Object.keys(errors).length > 0) return

        const user = auth.currentUser

        setLoading(true)

        const avatar = image ? await uploadImage(image) : ""

        let newData = {
            displayName: data.name,
        }

        if (avatar) newData = {
            ...newData, photoURL: avatar,
        }

        await updateProfile(auth.currentUser, newData)

        const res = await updateDocument("users", user.uid, {
            name: data.name,
            avatar: avatar,
            completed: true
        })

        if (res.status === 40) {
            return
        }

        Login()

    }

    return (
        <View style={styles.container}>
            <EditAvatar
                image={image}
                setImage={setImage}
            />

            <PaperInput
                label="Name"
                value={data.name}
                onChangeText={(text) => setData({ ...data, name: text })}
                error={errors.name}
            />

            <SubmitButton
                title="Save"
                onPress={handleSubmit}
                loading={loading}
            />

        </View>
    )
}

const Validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = 'Name is required';

    return errors;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 5,
    },
})