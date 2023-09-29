import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Snackbar } from 'react-native-paper'

export const ToastContext = React.createContext();

export default function ToastProvider({ children }) {

    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onToggleSnackBar = () => setVisible(!visible);

    const showToast = (message) => {
        setMessage(message)
        setVisible(true)
    }

    return (
        <ToastContext.Provider
            value={{
                showToast
            }}
        >
            {children}
            <Snackbar
                visible={visible}
                onDismiss={onToggleSnackBar}
            >
                {message}
            </Snackbar>
        </ToastContext.Provider>
    )
}

export const useToast = () => React.useContext(ToastContext)