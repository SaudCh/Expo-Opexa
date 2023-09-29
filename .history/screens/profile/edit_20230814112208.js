import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EditAvatar from '../../components/account/editAvatar'
import useFirebase from '../../hooks/useFirebase';
import { useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import { PaperInput } from '../../components/Inputs';
import { auth } from '../../config/firebase';
import useAuth from '../../hooks/useAuth';

export default function EditProfile() {

    const { updateDocument, uploadImage } = useFirebase()
    const { user, profile } = useAuth()
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: profile?.name || '',
    })
    const [errors, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const updateUser = async () => {

        const errors = Validate(data);

        setError(errors);
        if (Object.keys(errors).length > 0) return

        setLoading(true)
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 10
            }}
        >
            <EditAvatar
                image={image}
                setImage={setImage}
                preview={profile?.avatar}
            />

            <PaperInput
                label="Name"
                value={data.name}
                onChangeText={(text) => setData({ ...data, name: text })}
                error={errors.name}
            />

            <SubmitButton
                title="Update"
                onPress={updateUser}
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

const styles = StyleSheet.create({})