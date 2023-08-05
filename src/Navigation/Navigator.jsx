import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../Global/colors'
import ShopStack from './ShopStack'
import CartStack from './CartStack'
import OrderStack from './OrderStack'
import TabIcon from '../Components/Common/TabIcon/TabIcon';

const Tab = createBottomTabNavigator()

export default function Navigator() {
    return (
        <SafeAreaView style={styles.container} >
            <NavigationContainer style={styles.NavigationContainer}>
                <Tab.Navigator
                    initialRouteName='Shop'
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: styles.tabBar,
                        tabBarShowLabel: false,
                    }}>
                    <Tab.Screen name='Shop' component={ShopStack} options={{
                        tabBarIcon: ({ focused }) => { return (<TabIcon icon='store' text='Shop' color={focused ? colors.primary : colors.secondary} />)}
                    }}/>
                    <Tab.Screen name='Cart' component={CartStack} options={{
                        tabBarIcon: ({ focused }) => { return (<TabIcon icon='cart-variant' text='Cart' color={focused ? colors.primary : colors.secondary} />) }
                    }} />
                    <Tab.Screen name='Orders' component={OrderStack} options={{
                        tabBarIcon: ({ focused }) => { return (<TabIcon icon='order-bool-descending-variant' text='Orders' color={focused ? colors.primary : colors.secondary} />) }
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    NavigationContainer: {
        paddingBottom: 50,
    },
    tabBar: {
        backgroundColor: colors.primaryAccent,
        shadowColor: 'black',
        elevation: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
    }
})