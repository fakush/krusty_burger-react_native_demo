import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={texts.title}>Profile</Text>
            <Text style={texts.subtitle}>Coming Soon</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.primaryAccent,
        padding: 10,
        alignContent: 'center',
        justifyContent: 'center',
    }
})