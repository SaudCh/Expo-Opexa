import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { useAuth } from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import { auth } from '../../config/firebase';

const PlanScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const { updateDoc } = useFirebase()
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
    });

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const { Login } = useAuth()

    const hanldePress = async () => {

        const user = auth.currentUser

        await updateDoc("users", user.uid, {
            plan: selectedPlan,
        }).then(() => {
            Login()
        }).catch((err) => {
        }).finally(() => {
            // setLoading(false)
        })

    }

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                </View>
                <TouchableOpacity
                    style={[
                        styles.planButton,
                        selectedPlan === 'basic' ? styles.selectedPlan : null,
                    ]}
                    onPress={() => handleSelectPlan('basic')}
                >
                    {/* <Image
                        source={require('./assets/basic.png')}
                        style={styles.planIcon}
                    /> */}
                    <Text style={styles.planTitle}>Basic Plan</Text>
                    <Text style={styles.planDescription}>$0.00/month</Text>
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 10
                    }}>
                        Lorem ipsum dolor sit amet, consect adipiscing elit. Sed
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.planButton,
                        selectedPlan === 'premium' ? styles.selectedPlan : null,
                    ]}
                    onPress={() => handleSelectPlan('premium')}
                >
                    {/* <Image
                        source={require('./assets/premium.png')}
                        style={styles.planIcon}
                    /> */}
                    <Text style={styles.planTitle}>Premium Plan</Text>
                    <Text style={styles.planDescription}>$19.99/month</Text>
                    {/* lorem ipsem text */}
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 10
                    }}>
                        Lorem ipsum dolor sit amet, consect adipiscing elit. Sed
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={() => hanldePress()}
                >
                    <Text style={styles.subscribeButtonText}>
                        Subscribe Now{' '}
                        <Ionicons name="ios-arrow-forward" size={18} color="#fff" />
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(36, 162, 253, 0.2)'
    },
    header: {
        marginBottom: 30,
    },
    headerText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    planButton: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width - 100,
    },
    selectedPlan: {
        backgroundColor: 'rgba(36, 162, 253,0.2)',
    },
    planIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    planDescription: {
        fontSize: 16,
        color: '#999',
    },
    subscribeButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    subscribeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00BFFF',
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PlanScreen