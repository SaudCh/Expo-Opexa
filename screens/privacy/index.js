import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-paper'
import { Colors } from '../../constants/colors';
import Options from '../../components/account/options';

export default function Privacy() {

    const [notifications, setNotifications] = React.useState(false);
    const [number, setNumber] = useState(false)

    const Switches = ({
        title,
        children,
        isSwitchOn,
        setIsSwitchOn
    }) => {
        return (
            <View
                style={{ ...styles.switchContainer }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    {children}
                    <View style={{ marginStart: 10 }}>
                        <Text style={{ ...styles.text, color: "#16161A" }}>
                            {title}
                        </Text>
                    </View>

                </View>
                <Switch
                    color={Colors.primary}
                    value={isSwitchOn}
                    onValueChange={setIsSwitchOn}
                />
            </View>
        )
    }

    return (
        <View style={{
            padding: 10
        }}>
            <Switches
                title="Location"
                isSwitchOn={notifications}
                setIsSwitchOn={() => setNotifications(!notifications)}
            />

            <Switches
                title="Show Your Mobile Number on Ads"
                isSwitchOn={number}
                setIsSwitchOn={() => setNumber(!number)}
            />

            <Options
                title="Password"
                screen="UpPassword"
            />

            {/* <Options
                title="Email"
                screen="Email"
            /> */}

            <Options
                title="Close Account"
                screen="CloseAccount"
            />

        </View>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        color: '#16161A',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Circular'
    }
})