import { Country, State, City } from 'country-state-city';

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from './modal'

export default function LocationInput({
    visible,
    onDismiss,
    title,
    setData,
    data
}) {

    const [step, setStep] = useState(0)
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        const getData = async () => {
            const states = State.getStatesOfCountry("PK")
            setStates(states)
        }

        getData()

    }, [])

    useEffect(() => {
        const getData = async () => {
            const cities = City.getCitiesOfState("PK", data.stateCode)
            setCities(cities)
        }

        getData()
    }
        , [data.stateCode])


    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={title}
        >
            {step === 0 &&
                <FlatList
                    data={states}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setData((prev) => ({
                                    ...prev,
                                    state: item.name,
                                    stateCode: item.isoCode
                                }))
                                setStep(1)
                            }}
                        >
                            <View style={{
                                padding: 10,
                                paddingVertical: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                            }}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.isoCode}
                />
            }
            {step === 1 &&
                <FlatList
                    data={cities}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setData((prev) => ({
                                    ...prev,
                                    state: item.name,
                                    stateCode: item.isoCode
                                }))
                                setStep(1)
                            }}
                        >
                            <View style={{
                                padding: 10,
                                paddingVertical: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                            }}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            }
        </Modal>
    )
}

const styles = StyleSheet.create({})