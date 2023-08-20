import React from "react";
import Header from '../Common/Header'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupPage from "../Screens/SignupPage";
import LoginPage from "../Screens/LoginPage";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
        </Stack.Navigator>
    );
};

export default AuthStack;