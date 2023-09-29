import { Country, State, City } from 'country-state-city';

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from './modal'

export default function LocationInput({
    visible,
    onDismiss,
    title,
}) {

    const [states, setStates] = useState([])

    useEffect(() => {
        const getData = async () => {
            const states = State.getStatesOfCountry("PK")
            setStates(states)
        }

        getData()

    }, [])

    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={title}
        >
            <FlatList
                data={states}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            onDismiss()
                        }}
                    >
                        <View style={{
                            padding: 10,
                            paddingVertical: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                        }}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.isoCode}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({})