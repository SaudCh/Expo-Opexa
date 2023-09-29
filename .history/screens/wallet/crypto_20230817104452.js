import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image, ToastAndroid } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import { useStripe } from '@stripe/stripe-react-native';
import { Colors } from '../../constants/colors';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import useFirebase from '../../hooks/useFirebase';
import { where } from 'firebase/firestore';
import * as Clipboard from 'expo-clipboard';
import CryptoModal from './modal';
// import Clipboard from '@react-native-clipboard/clipboard';

const DepositScreen = () => {

    const navigation = useNavigation();
    const user = auth.currentUser

    const [modal, setModal] = useState(false)
    // const { getDocuments } = useFirebase()
    const [loading, setLoading] = useState(false)
    const [currency, setCurrency] = useState([])

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);

        ToastAndroid.showWithGravity(
            "Copied to clipboard",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

    };

    const getCurrency = async () => {

        const res = await getDocuments("crypto",
            setLoading,
            where('isDeleted', '==', false)
        )

        if (res.status == 400) {
            return
        }

        setCurrency(res.data)
    }


    useEffect(() => {
        getCurrency()
    }, [])


    return (
        <View style={styles.container}>

            <View style={styles.paymentOptions}>
                <Text style={styles.title}>Select Payment Option:</Text>
                <Text
                    style={{
                        fontFamily: "Circular",
                        color: Colors.grey
                    }}
                >
                    Press the current to copy the wallet address
                </Text>

                <FlatList
                    data={currency}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            // copy to clipboard
                            onPress={() => copyToClipboard(item.address)}
                            style={styles.radioBtn}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginRight: 10
                                }}
                            />
                            <View>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        fontFamily: "Circular"
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Circular",
                                        color: Colors.grey
                                    }}
                                >
                                    {item.address}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />


            </View>

            <Button
                onPress={() => setModal(true)}
                style={styles.depositBtn}
                mode="contained"
                disabled={loading}
                loading={loading}

            >
                Add Screenshot
            </Button>

            <CryptoModal
                modalVisible={modal}
                setModalVisible={setModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    depositOptions: {
        marginBottom: 20,
    },
    radioBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 5,

    },
    paymentOptions: {
        marginBottom: 20,
    },
    depositBtn: {
        borderRadius: 5,
    },
    title: {
        fontFamily: "Circular",
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.primary
    }
});

export default DepositScreen;