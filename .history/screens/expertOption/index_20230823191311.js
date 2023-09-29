import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { Colors } from '../../constants/colors';
import SafeAreaContainer from '../../components/safeAreaContainer';

export default function Home() {

    const navigation = useNavigation()

    return (
        <SafeAreaContainer>

            <Text style={{
                fontSize: 16,
                // light color
                color: '#666',
                paddingHorizontal: 20,
                paddingBottom: 10,

            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text style={{
                fontSize: 16,
                // light color
                color: '#666',
                paddingHorizontal: 20,
                paddingBottom: 10,

            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>

            <Button
                mode="contained"
                style={{
                    margin: 20,
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                }}
                onPress={() => navigation.navigate('SelectCategory', {
                    expert: true
                })}
            >
                List Your Product
            </Button>

        </SafeAreaContainer>
    )
}

const styles = StyleSheet.create({
    stickyHeader: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollHeader: {
        backgroundColor: '#ddd',
    },

})