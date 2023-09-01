import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../Utils/Global/colors'
import MenuStack from './MenuStack'
import StoreLocatorStack from './StoreLocatorStack'
import OrderStack from './OrderStack'
import ProfileStack from './ProfileStack'
import AuthStack from './AuthStack';
import TabIcon from '../Common/TabIcon/TabIcon';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator()

export default function Navigator() {
    const { email } = useSelector(state => state.userReducer.value)

    return (
        <SafeAreaView style={styles.container} >
            <NavigationContainer style={styles.NavigationContainer}>
                {
                    email ?
                        <Tab.Navigator
                            initialRouteName='Menu'
                            screenOptions={{
                                headerShown: false,
                                tabBarStyle: styles.tabBar,
                                tabBarShowLabel: false,
                            }}>
                            <Tab.Screen name='Menu' component={MenuStack} options={{
                                tabBarIcon: ({ focused }) => { return (<TabIcon icon='hamburger' text='Menu' color={focused ? colors.secondaryAccent : colors.secondary} />) }
                            }} />
                            <Tab.Screen name='Order' component={OrderStack} options={{
                                tabBarIcon: ({ focused }) => { return (<TabIcon icon='cash-register' text='Order' color={focused ? colors.secondaryAccent : colors.secondary} />) }
                            }} />
                            <Tab.Screen name='Stores' component={StoreLocatorStack} options={{
                                tabBarIcon: ({ focused }) => { return (<TabIcon icon='store-search' text='Store Locator' color={focused ? colors.secondaryAccent : colors.secondary} />) }
                            }} />
                            <Tab.Screen name='Profile' component={ProfileStack} options={{
                                tabBarIcon: ({ focused }) => { return (<TabIcon icon='account-circle' text='Profile' color={focused ? colors.secondaryAccent : colors.secondary} />) }
                            }} />
                        </Tab.Navigator>
                        : <AuthStack />
                }
            </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    NavigationContainer: {
        marginBottom: 60,
    },
    tabBar: {
        backgroundColor: colors.primary,
        shadowColor: 'black',
        elevation: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    }
})