import React from "react";
import Header from '../Components/Header'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StoreLocator from "../Screens/StoreLocator";

const Stack = createNativeStackNavigator()

export default function StoreLocatorStack() {
    return (
        <Stack.Navigator
            initialRouteName="StoreLocator"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="StoreLocatorScreen" component={StoreLocator} />

        </Stack.Navigator>
    );
};