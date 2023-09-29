import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Button } from 'react-native-paper';
import Options from '../../components/account/options';
import { options } from './data';
import { useNavigation } from '@react-navigation/native';


export default function Help() {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{ marginTop: 15 }}>
                    {
                        options.map((option, index) => {
                            return (
                                option?.line ?
                                    <View
                                        key={index}
                                        style={{
                                            borderBottomColor: 'lightgray',
                                            borderBottomWidth: 1,
                                            marginTop: 10,
                                            marginBottom: 20
                                        }}
                                    />
                                    : <Options
                                        key={index}
                                        title={option.title}
                                        screen={option.screen}
                                        logout={option.logout ? true : false}
                                    >
                                        {option.icon}
                                    </Options>)
                        }

                        )
                    }
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    infoContainer: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    }
})