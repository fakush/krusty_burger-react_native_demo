import React from "react";
import Header from '../Components/Header'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupPage from "../Screens/SignupPage";
import LoginPage from "../Screens/LoginPage";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Signup"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
    );
};

export default AuthStack;