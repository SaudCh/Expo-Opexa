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
import useApi from '../../hooks/useApi'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

export default function CmpProfile() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
    })
    const [errors, setError] = useState({})
    const { uploadImage } = useApi()
    const [loading, setLoading] = useState(false)
    const { Login, user, token } = useAuth()
    const navigation = useNavigation()

    const handleSubmit = async () => {

        const errors = Validate(data);

        setError(errors);
        if (Object.keys(errors).length > 0) return

        const avRes = image ? await uploadImage('image', image, setLoading) : { status: 200, message: "success", image: "" }

        if (avRes.status !== 200) {
            setLoading(false)
            return
        }

        let newData = {
            name: data.name,
            completed: true,
        }

        if (avRes) newData = {
            ...newData, avatar: avRes.image,

        }

        setLoading(true)
        await axios.patch('auth/update-profile', newData)
            .then(res => {
                console.log(res.data)
                Login({
                    ...user,
                    completed: true,
                }, token)
            })
            .catch(err => { console.log(err) })
            .finally(() => { setLoading(false) })

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