import { StyleSheet, Text, Pressable } from 'react-native'
import { colors } from '../../../Utils/Global/colors'
import { Button } from 'react-native-paper';
import React from 'react'

const DefaultButton = ({ icon, color, text, onPress }) => {
    return (
        <Button
            icon={icon}
            buttonColor={colors.primary}
            rippleColor={colors.primaryAccent}
            textColor={colors.secondary}
            onPress={onPress}>
            {text}
        </Button>
    )
}

export default DefaultButton