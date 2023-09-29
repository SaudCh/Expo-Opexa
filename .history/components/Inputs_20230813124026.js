import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

export function PaperInput(props) {
    return (
        <>
            <TextInput
                mode={props.mode ? props.mode : "outlined"}
                {...props}
                style={{
                    backgroundColor: "white",
                    marginBottom: props.error ? 0 : 10,
                }}
                autoCapitalize='none'
            />
            {
                props.error && <Text style={{ color: "red", fontSize: 12, marginLeft: 5, marginBottom: 5 }}>{props.error}</Text>
            }
        </>
    )
}

const styles = StyleSheet.create({})