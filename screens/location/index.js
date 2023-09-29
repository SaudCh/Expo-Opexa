import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, RadioButton, Text, TextInput, Title } from 'react-native-paper';
import CountryFlag from "react-native-country-flag";
import { Colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import LocationPicker from '../../components/account/locationPicker';


const LocationScreen = () => {
    const [language, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();

    const handleLanguage = (lang) => {
        setLanguage(lang);
    }

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');


    return (
        <View style={styles.container}>
            <Title style={styles.title}>{t("Choose the Country")}</Title>

            <View style={styles.locationInfo}>
                <CountryFlag isoCode={countryCode} size={20} />
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: 'Circular',
                    paddingTop: 0,
                    marginLeft: 10,
                }}>
                    {city}-{country}
                </Text>
            </View>

            <LocationPicker
                setCity={setCity}
                setCountry={setCountry}
                setCountryCode={setCountryCode}
            />
            <Button mode="contained" style={styles.button}>
                {t("select")}
            </Button>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Circular',
        paddingVertical: 20,
        paddingBottom: 0,
    },
    radioGroup: {
        alignItems: 'center',
        marginBottom: 30,
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: 60,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 5,

    },
    radioText: {
        fontSize: 18,
        marginLeft: 10,
    },
    button: {
        width: 200,
        borderRadius: 5,
        backgroundColor: '#2ecc71',
        position: 'absolute',
        bottom: 50,
    },
    selected: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 5,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.main,
    }
});

export default LocationScreen;