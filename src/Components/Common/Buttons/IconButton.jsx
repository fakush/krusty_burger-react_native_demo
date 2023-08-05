import { StyleSheet, Text, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import React from 'react'

const DefaultButton = ({ icon, color, onPress }) => {
    return (
        <Pressable
            style={styles.buttonStyle}
            onPress={onPress}
        >
            <Icon name={icon} size={30} type='material-community' color={color} />
        </Pressable>
    )
}

export default DefaultButton

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    }
})