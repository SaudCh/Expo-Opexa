import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import useFirebase from '../../hooks/useFirebase';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { where } from 'firebase/firestore';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import { auth } from '../../config/firebase';
import axios from 'axios';

const WalletScreen = () => {

    const navigation = useNavigation()

    const [wallet, setWallet] = useState({})
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState([])
    const [error, setError] = useState(null)

    const getWallet = async () => {
        await axios.get('auth/get-wallet')
            .then(res => {
                setWallet(res.data.wallet)
                setPayments(res.data.payments)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getWallet()
    }, [])


    return (
        <FlatList
            data={payments}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
                <View style={styles.transactionRow}>
                    <View style={styles.transactionIconContainer}>
                        <Ionicons name="ios-card" size={28} color="#007AFF" />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionTitle}>Card</Text>
                        <Text style={styles.transactionDate}>{
                            item.status === 'created' ? "Failed" : "Success"
                        }</Text>
                    </View>
                    <View style={styles.transactionAmountContainer}>
                        <Text style={styles.transactionAmount}>{
                            item?.amount ? formatCurrencyPKR(item?.amount) : formatCurrencyPKR(0)
                        }</Text>
                        <Ionicons name="ios-arrow-forward" size={24} color="#007AFF" />
                    </View>
                </View>
            )}
            ListHeaderComponent={
                <>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceTitle}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>{
                            wallet?.balance ? formatCurrencyPKR(wallet.balance) : formatCurrencyPKR(0)
                        }</Text>
                        <TouchableOpacity
                            style={[styles.depositButton, { marginBottom: 10 }]}
                            onPress={() => navigation.navigate("DepositScreen")}
                        >
                            <Text style={[styles.depositButtonText]}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.withdrawButton}>
                            <Text style={styles.withdrawButtonText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.transactionsTitle}>Recent Transactions</Text>
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        height: 80,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerTitle: {
        color: '#fff',

        fontSize: 20,
        fontWeight: 'bold',
    },
    balanceContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#F4F4F4',
    },
    balanceTitle: {
        color: '#A0A0A0',
        fontSize: 16,
        marginBottom: 10,
    },
    balanceAmount: {
        color: '#000',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    depositButton: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    depositButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    withdrawButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    withdrawButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    transactionsTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20,
    },
    transactionIconContainer: {
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        padding: 10,
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 20,
    },
    transactionTitle: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    transactionDate: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    transactionAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionAmount: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default WalletScreen;