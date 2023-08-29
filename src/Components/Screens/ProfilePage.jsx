import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import IconButton from '../Common/Buttons/IconButton'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../Redux/Slices/userSlice'
import localPersistence from '../../Services/localPersistenceService'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.value)
    console.log('🟩 user:', user);
    const localUser = localPersistence.jsonGet('user')
    console.log('🟩 localUser:', localUser);

    const onLogout = () => {
        localPersistence.clearStorage()
        dispatch(signOut())
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.profileImage }} style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center' }} />
            <Text style={texts.title}>User Profile</Text>
            <Text style={texts.subtitle}>Name: {user.fullName}</Text>
            <Text style={texts.subtitle}>Email: {user.email}</Text>
            <IconButton icon='logout' text='Logout' onPress={onLogout} />
        </View>
    )
}

export default ProfilePage

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