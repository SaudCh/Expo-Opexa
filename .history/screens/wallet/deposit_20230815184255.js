import axios from 'axios';
import { RadioButton, Button } from 'react-native-paper';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { Colors } from '../../constants/colors';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import useAuth from '../../hooks/useAuth';

const DepositScreen = () => {

    const navigation = useNavigation();
    const { user, profile } = useAuth()

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [depositAmount, setDepositAmount] = useState(null);
    const [paymentOption, setPaymentOption] = useState(null);
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)

    const openPaymentSheet = async () => {

        setLoading(true)

        console.log(depositAmount, paymentOption);

        const response = await axios.post("transcation/create-intent", {
            amount: depositAmount,
            currency: 'pkr',
            receipt_email: user.email,
            receipt_name: profile.name,
            uid: user.id,
            description: 'Deposit to Opxa Wallet'
        }).finally(() => setLoading(false))

        if (response.error) {
            console.log(response.error);
            Alert.alert('Something went wrong');
            setLoading(false)
            return;
        }

        console.log(response.data);

        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'Opxa',
            paymentIntentClientSecret: response.data.paymentIntent,
        });
        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Something went wrong');
            setLoading(false)

            return;
        }

        // 3. Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error) {
            Alert.alert(
                `Error code: ${paymentResponse.error.code}`,
                paymentResponse.error.message
            );
            setLoading(false)

            return;
        }

        // 4. If no errors, the payment succeeded
        Alert.alert('Success', 'Your payment was processed successfully');
        navigation.goBack()

        setLoading(false)

    }


    return (
        <View style={styles.container}>
            <View style={styles.depositOptions}>
                <Text style={styles.title}>Select Deposit Amount:</Text>
                <TouchableOpacity
                    onPress={() => setDepositAmount(200)}
                    style={styles.radioBtn}
                >
                    <RadioButton.Android
                        value={200}
                        status={depositAmount === '200' ? 'checked' : 'unchecked'}
                        onPress={() => setDepositAmount('200')}
                    />
                    <Text>{formatCurrencyPKR(200)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDepositAmount('10')}
                    style={styles.radioBtn}>
                    <RadioButton.Android
                        value="1000"
                        status={depositAmount === '1000' ? 'checked' : 'unchecked'}
                        onPress={() => setDepositAmount('1000')}
                    />
                    <Text>{formatCurrencyPKR(1000)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDepositAmount('10000')}
                    style={styles.radioBtn}>
                    <RadioButton.Android
                        value="10000"
                        status={depositAmount === '10000' ? 'checked' : 'unchecked'}
                        onPress={() => setDepositAmount('10000')}
                    />
                    <Text>{formatCurrencyPKR(10000)}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.paymentOptions}>
                <Text style={styles.title}>Select Payment Option:</Text>
                <TouchableOpacity
                    onPress={() => setPaymentOption('Card')}
                    style={styles.radioBtn}>
                    <RadioButton.Android
                        value="Card"
                        status={paymentOption === 'Card' ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentOption('Card')}
                    />
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                fontFamily: "Circular"
                            }}
                        >
                            Card
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Circular",
                                color: Colors.grey
                            }}
                        >
                            Master Card, Visa Card, Google Pay, Apple Pay
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CryptoScreen')}
                    style={styles.radioBtn}>
                    <RadioButton.Android
                        value="Card"
                    />
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                fontFamily: "Circular"
                            }}
                        >
                            Crypto
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Circular",
                                color: Colors.grey
                            }}
                        >
                            Bitcoin, Ethereum, Litecoin...
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.radioBtn}>
                    <RadioButton.Android
                        value="Jazzcash"
                        status={paymentOption === 'Jazzcash' ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentOption('Jazzcash')}
                    />
                    <Text>Jazzcash</Text>
                </View> */}
                {/* <View style={styles.radioBtn}>
                    <RadioButton.Android
                        value="Crypto"
                        status={paymentOption === 'Crypto' ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentOption('Crypto')}
                    />
                    <Text>Crypto</Text>
                </View> */}
            </View>

            <Button
                style={styles.depositBtn}
                mode="contained"
                onPress={openPaymentSheet}
                disabled={!depositAmount || !paymentOption || loading}
                loading={loading}

            >
                Deposit
            </Button>
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
