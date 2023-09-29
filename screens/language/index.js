import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, RadioButton, Text, TextInput, Title } from 'react-native-paper';
import CountryFlag from "react-native-country-flag";
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

const LanguageScreen = () => {
    const [language, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();

    const handleLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>{t("ChooseLanguage")}</Title>

            <TouchableOpacity onPress={() => handleLanguage('en')} style={language == 'en' ? styles.selected : styles.option} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CountryFlag isoCode="gb" size={25} />
                    <Text style={styles.radioText}>English</Text>
                </View>
                {
                    language === 'en' && <Feather name="check-circle" size={24} color={Colors.main} />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguage('pk')} style={language == 'pk' ? styles.selected : styles.option} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CountryFlag isoCode="pk" size={25} />
                    <Text style={styles.radioText}>اردو</Text>
                </View>
                {
                    language === 'pk' && <Feather name="check-circle" size={24} color={Colors.main} />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguage('ae')} style={language == 'ae' ? styles.selected : styles.option} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CountryFlag isoCode="ae" size={25} />
                    <Text style={styles.radioText}>عربي</Text>
                </View>
                {
                    language === 'ae' && <Feather name="check-circle" size={24} color={Colors.main} />
                }
            </TouchableOpacity>
            <Button mode="contained" style={styles.button}>
                {t("select")}
            </Button>
        </View>
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
    },
    radioGroup: {
        alignItems: 'center',
        marginBottom: 30,
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

export default LanguageScreen;
