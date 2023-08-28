import React from "react";
import Header from '../Common/Header'
import Orders from "../Screens/OrdersPage";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

export default function OrderStack() {
    return (
        <Stack.Navigator
            initialRouteName="OrderScreen"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="OrderScreen" component={Orders} />

        </Stack.Navigator>
    );
};