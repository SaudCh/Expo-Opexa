import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Text, View } from 'react-native';

import MyAds from '../screens/myAds';
import SellButton from './SellButton';
import MessageScreen from '../screens/message';
import Sell from '../screens/sell';
// import SellStack from './SellStack';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? Colors.main : Colors.line} />
                        <Text style={{ color: focused ? Colors.main : Colors.line, fontSize: 12 }}>Home</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Messages" component={MessageScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} size={24} color={focused ? Colors.main : Colors.line} />
                        <Text style={{ color: focused ? Colors.main : Colors.line, fontSize: 12 }}>Chat</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Sell" component={Sell}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome name={"plus"} size={28} color={focused ? Colors.main : Colors.line} />
                        </View>
                    ),
                    tabBarButton: (props) => <SellButton {...props} />,
                }}

            // options={{
            //     headerShown: false,
            //     tabBarIcon: ({ focused }) => (
            //         <View style={{ alignItems: "center", justifyContent: "center" }}>
            //             <FontAwesome name={"plus"} size={24} color={focused ? Colors.main : Colors.line} />
            //             <Text style={{ color: focused ? Colors.main : Colors.line, fontSize: 12 }}>Add</Text>
            //         </View>
            //     ),
            // }} 

            />
            <Tab.Screen name="Ads" component={MyAds} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <MaterialCommunityIcons name={focused ? "post" : "post-outline"} size={24} color={focused ? Colors.main : Colors.line} />
                        <Text style={{ color: focused ? Colors.main : Colors.line, fontSize: 12 }}>My Ads</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <FontAwesome name={focused ? "user" : "user-o"} size={24} color={focused ? Colors.main : Colors.line} />
                        <Text style={{ color: focused ? Colors.main : Colors.line, fontSize: 12 }}>Accounts</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
}