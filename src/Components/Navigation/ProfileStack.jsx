import React from "react";
import Header from '../Common/Header'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from "../Screens/Profile";

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="ProfileScreen" component={Profile} />

        </Stack.Navigator>
    );
};