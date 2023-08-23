import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import IconButton from '../Common/Buttons/IconButton'
import { useDispatch } from 'react-redux';
import { signOut } from '../../Redux/Slices/userSlice'
import localPersistence from '../../Services/localPersistenceService'

const Profile = () => {
    const dispatch = useDispatch()

    const onLogout = () => {
        localPersistence.clearStorage()
        dispatch(signOut())
    }

    return (
        <View style={styles.container}>
            <Text style={texts.title}>Profile</Text>
            <Text style={texts.subtitle}>Coming Soon</Text>
            <IconButton icon='logout' text='Logout' onPress={onLogout} />
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