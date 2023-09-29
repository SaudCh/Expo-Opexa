import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Animated, Image } from 'react-native'
import Header from './header';
import { Colors } from '../../constants/colors';
import { getAvatar } from '../../utils/getAvatar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrencyPKR } from '../../utils/currencyFormatter';
import Modal from './modal';

export default function ProductModal({
    visible,
    onDismiss,
    backPress,
    user
}) {


    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={'Add Product'}
            back
            backPress={() => backPress()}
        >

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    infoContainer: {
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    },
    heading: {
        fontSize: 20,
        fontFamily: 'Circular',
        color: Colors.main
    },
})