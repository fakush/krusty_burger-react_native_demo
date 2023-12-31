import { StyleSheet, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

const DefaultButton = ({ icon, color, text, onPress }) => {
    return (
        <Pressable
            style={[{ backgroundColor: color }, styles.buttonStyle]}
            onPress={onPress}
        >
            {icon && <Icon name={icon} size={20} color='white' />}
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
    )
}

export default DefaultButton

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        elevation: 3,
        borderRadius: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    }
})