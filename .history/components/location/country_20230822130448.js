import { Country, State, City } from 'country-state-city';

import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from './modal'

export default function CityInput({
    visible,
    onDismiss,
    title,
}) {

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        const getData = async () => {
            const states = State.getStatesOfCountry("PK")
            setStates(states.map((item) => {
                return {
                    label: item.name,
                    value: item.isoCode
                }
            }))
        }

        getData()

    }, [])

    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={title}
        >

        </Modal>
    )
}

const styles = StyleSheet.create({})