import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const UpdatePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = () => {
        // TODO: Implement password update logic
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Update Password</Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
                Please enter your old password and your new password. Your new password must be at least 8 characters long and
                cannot be the same as your old password.
            </Text>
            <TextInput
                label="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                style={{ marginBottom: 20 }}
                mode="outlined"
            />
            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={{ marginBottom: 20 }}
                mode="outlined"
            />
            <TextInput
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={{ marginBottom: 20 }}
                mode="outlined"
            />
            <Button mode="contained" onPress={handleUpdatePassword}>
                Update Password
            </Button>
        </View>
    );
};

export default UpdatePasswordScreen;
