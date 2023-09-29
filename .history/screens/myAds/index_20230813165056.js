import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import FavAds from './favAds';
import MyAds from './myAds';
import useAuth from '../../hooks/useAuth';
import LoginFirst from '../../components/loginFirst';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {

    const { isLoggedIn } = useAuth()

    return (
        <View style={{
            backgroundColor: 'white',
            paddingTop: 50
        }}>
            <Text style={styles.appName}>My Ads</Text>
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
                                width: label === 'ADS' ? '40%' : '60%',
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
    const { isLoggedIn } = useAuth()
    return (
        isLoggedIn ?
            <Tab.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <Tab.Screen name="MyAds" component={MyAds}
                    options={{
                        tabBarLabel: 'ADS',
                    }}
                />
                <Tab.Screen name="FavAds" component={FavAds}
                    options={{
                        tabBarLabel: 'FAVOURITES',
                    }}
                />
            </Tab.Navigator>
            :
            <LoginFirst text="You need to login first to view your ads" />
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
