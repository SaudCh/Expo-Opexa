import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo } from '@expo/vector-icons';

import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import Seller from './seller';
import Buyer from './buyer';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{
            backgroundColor: 'white',
            paddingTop: 50
        }}>
            <TouchableOpacity>
                <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.appName}>Biding Requests</Text>
            <View style={styles.container}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={[styles.tabButton, {
                                width: '50%',
                                backgroundColor: isFocused ? 'white' : '#ffffff00'
                            }]}
                            onPress={onPress}
                        >
                            <Text style={[styles.tabText, { color: 'black' }]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default function TopTabs() {

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="BidSeller" component={Seller}
                options={{
                    tabBarLabel: 'Seller',
                }}
            />
            <Tab.Screen name="BidBuyer" component={Buyer}
                options={{
                    tabBarLabel: 'Buyer',
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
        width: '60%',
        marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    tabButton: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    tabText: {
        fontSize: 13,
        fontFamily: 'Circular'
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        color: Colors.primary,
        fontFamily: 'Circular'
    }
});
