import { Country, State, City } from 'country-state-city';

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Modal from './modal'
import axios from 'axios';
import { Searchbar } from 'react-native-paper';

export default function LocationInput({
    visible,
    onDismiss,
    title,
    setData,
    data
}) {

    const [step, setStep] = useState(0)
    const [search, setSearch] = useState({
        state: '',
        city: '',
        area: ''
    })
    const [states, setStates] = useState([])
    const filteredStates = useMemo(() => {
        if (!search.state) return states
        return states.filter((state) => {
            return state?.name?.toLowerCase().includes(search?.state?.toLowerCase())
        })
    }, [search.state, states])

    const [cities, setCities] = useState([])
    const filteredCities = useMemo(() => {
        if (!search.city) return cities
        return cities.filter((city) => {
            return city?.name?.toLowerCase().includes(search.city.toLowerCase())
        })
    }, [search.city, cities])

    const [areas, setAreas] = useState([])
    const filteredAreas = useMemo(() => {
        return areas.filter((area) => {
            return area?.name.toLowerCase().includes(search?.area.toLowerCase())
        })
    }, [search.area, areas])


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
    }, [data.stateCode])

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`area?city=${data.city}`)
                .then((res) => {
                    setAreas(res.data.areas)
                })

        }

        getData()
    }, [data.city])

    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={title}
            back={step > 0}
            backPress={() => setStep((prev) => prev - 1)}
        >
            {step === 0 &&
                <FlatList
                    data={filteredStates}
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
                    ListHeaderComponent={
                        <Searchbar
                            placeholder="Search"
                            value={search.state}
                            onChangeText={(text) => {
                                setSearch((prev) => ({
                                    ...prev,
                                    state: text,
                                })
                                )
                            }}
                            style={{
                                marginHorizontal: 10,
                            }}
                        />
                    }
                />
            }
            {step === 1 &&
                <FlatList
                    data={filteredCities}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setData((prev) => ({
                                    ...prev,
                                    city: item.name,
                                }))
                                setStep(2)
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
                    ListHeaderComponent={
                        <Searchbar
                            placeholder="Search"
                            value={search.city}
                            onChangeText={(text) => {
                                setSearch((prev) => ({
                                    ...prev,
                                    city: text,
                                })
                                )
                            }}
                            style={{
                                marginHorizontal: 10,
                            }}
                        />
                    }
                />
            }

            {step === 2 &&
                <FlatList
                    data={areas}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setData((prev) => ({
                                    ...prev,
                                    area: item.name,
                                }))
                                onDismiss()
                                // setStep(0)
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
                    keyExtractor={(item) => item._id}
                    ListHeaderComponent={
                        <Searchbar
                            placeholder="Search"
                            value={search.area}
                            onChangeText={(text) => {
                                setSearch((prev) => ({
                                    ...prev,
                                    area: text,
                                })
                                )
                            }}
                            style={{
                                marginHorizontal: 10,
                            }}
                        />
                    }
                />
            }
        </Modal>
    )
}

const styles = StyleSheet.create({})