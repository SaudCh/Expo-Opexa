import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Colors } from '../../constants/colors';

const DeleteProfileScreen = () => {
    const [reason, setReason] = useState('');

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Delete Profile</Text>
                <Text style={styles.paragraph}>
                    Are you sure you want to delete your profile? Please let us know why so we can improve our service.
                </Text>
                <TextInput
                    mode='outlined'
                    multiline={true}
                    label="Reason"
                    numberOfLines={4}
                    style={{
                        backgroundColor: '#fff',
                        marginBottom: 10,
                        minHeight: 120
                    }}
                    value={reason}
                    onChangeText={setReason}
                    placeholder="Reason for deleting profile"
                    placeholderTextColor="#a9a9a9"
                />
                <Text style={styles.note}>Note: This action cannot be undone.</Text>
                <Button
                    mode="oultined"
                    style={{
                        marginTop: 20,
                        borderWidth: 1,
                        borderColor: Colors.danger
                    }}
                    textColor={Colors.danger}
                    onPress={() => {
                        console.log('Delete profile');
                    }}
                >
                    Delete Profile
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 18,
        marginBottom: 20,
    },
    note: {
        fontSize: 14,
        color: '#a9a9a9',
    },
});

export default DeleteProfileScreen;
