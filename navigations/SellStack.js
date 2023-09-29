import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Colors } from '../constants/colors';
import SelectSubCategory from '../screens/sell/selectSubCategory';
import Sell from '../screens/sell';
import SelectFurCategory from '../screens/sell/selectFurCategory';


const Stack = createNativeStackNavigator();

const options = {
    headerShown: true,
    headerTitle: 'My Wallet',
    headerTitleStyle: {
        color: Colors.main,
        fontSize: 16,
        fontFamily: 'Circular'
    },
    headerBackTitleVisible: false,
    headerTintColor: Colors.main,
}

function SellStack() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,

        }}
        >
            <Stack.Screen name="SelectCategory" component={Sell} />
            <Stack.Screen name="SelectSubCategory" component={SelectSubCategory}
                options={({ route }) => ({
                    ...options,
                    headerTitle: route.params.title ? route.params.title : 'Select Sub Category',
                })}
            />
            <Stack.Screen name="SelectFurCategory" component={SelectFurCategory}
                options={({ route }) => ({
                    ...options,
                    headerTitle: route.params.title ? route.params.title : 'Select Sub Category',
                })}
            />

        </Stack.Navigator>
    );
}

export default SellStack;