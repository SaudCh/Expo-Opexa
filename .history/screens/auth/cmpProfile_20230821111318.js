import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import EditAvatar from '../../components/account/editAvatar'
import { PaperInput } from '../../components/Inputs'
import SubmitButton from '../../components/SubmitButton'
import useApi from '../../hooks/useApi'
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
                console.log(user)
                console.log(new Date(user.expires).toISOString())
                Login({
                    ...user,
                    completed: true,
                }, token, new Date(user.expires))
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