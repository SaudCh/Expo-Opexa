import React from 'react';
import { StyleSheet, View, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const SearchBar = ({ value, onChangeText, onSubmitEditing }) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Search for products..."
                    placeholderTextColor="#777"
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={() => {
                        console.log('searching for', value)
                        onSubmitEditing()
                    }}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => onSubmitEditing()}>
                    <Ionicons name="search" size={24} color="#777" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightgrey,
        padding: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});

export default SearchBar;
