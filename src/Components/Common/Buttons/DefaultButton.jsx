import { StyleSheet, Text, Pressable } from 'react-native'
import { IconButton } from 'react-native-paper'
import React from 'react'

const DefaultButton = ({ icon, color, text, onPress }) => {
    return (
        <Pressable
            style={[{ backgroundColor: color }, styles.buttonStyle]}
            onPress={onPress}
        >
            {icon && <IconButton icon={icon} size={20} containerColor={color} iconColor='black' />}
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
        color: 'black',
        fontWeight: 'bold',
    }
})