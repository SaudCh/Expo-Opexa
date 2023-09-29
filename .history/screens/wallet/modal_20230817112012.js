import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { PaperInput } from '../../components/Inputs';
import { Colors } from '../../constants/colors';
import SsInput from './ssInput';
import { Button } from 'react-native-paper';
import useFirebase from '../../hooks/useFirebase';
import { auth } from '../../config/firebase';
import { randomText } from '../../utils/randomText';
import useApi from '../../hooks/useApi';

export default function CryptoModal({ modalVisible, setModalVisible }) {

    const [data, setData] = useState({
        amount: '',
    })
    const { uploadImage } = useApi()
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        console.log(image);

        if (!image) {
            alert('Please select an image')
            return
        }

        if (!data?.amount) {
            alert('Please enter amount')
            return
        }

        const imgRes = await uploadImage('image', image)

        if (imgRes.status !== 200) {
            return
        }

        setLoading(true)
        // await 

    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        // keyboardShouldPersistTaps='always'
        >
            <View style={styles.centeredView}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '90%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: Colors.primary }}>Add Screenshot</Text>
                    <PaperInput
                        label="Amount"
                        value={data?.amount}
                        onChangeText={(text) => setData({ ...data, amount: text })}
                    />
                    <SsInput
                        label="Screenshot"
                        image={image}
                        setImage={setImage}
                    />
                    <Button
                        onPress={handleSubmit}
                        style={{
                            backgroundColor: Colors.primary,
                            borderRadius: 5,
                            marginBottom: 20,
                        }}
                        textColor='#fff'
                        mode="contained"
                        disabled={loading}
                        loading={loading}
                    >
                        Submit
                    </Button>
                    <Button
                        onPress={() => setModalVisible(false)}
                        style={{
                            borderColor: Colors.primary,
                            borderRadius: 5,
                        }}
                        textColor={Colors.primary}
                        mode="outlined"
                        disabled={loading}
                        loading={loading}
                    >
                        Cancel
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000099',
    },
})