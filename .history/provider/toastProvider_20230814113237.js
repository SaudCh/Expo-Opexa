import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Snackbar } from 'react-native-paper'

// export const ToastContext = React.createContext();

export default function ToastProvider({ children }) {

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    return (
        <>
            {children}
            <Snackbar
                visible={visible}
                onDismiss={onToggleSnackBar}
            // onDismiss={onDismissSnackBar}
            >
                Hey there! I'm a Snackbar.
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({})