import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import IconButton from '../Common/Buttons/IconButton'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../Redux/Slices/userSlice'
import localPersistence from '../../Services/localPersistenceService'
import { useGetUserByLocalIdQuery } from '../../Services/shopService'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.value)
    const [userData, setUserData] = useState(user)

    // const getLocalUser = async () => {
    //     const localUser = await localPersistence.getJson('user')
    //     console.log('🟩 localUser:', localUser);
    //     user = localUser
    // }
    
    // useEffect(() => {
    //     getLocalUser()
    // }, [])
    const { data: userInfo, isError, isLoading } = useGetUserByLocalIdQuery(user.localId)
    
    useEffect(() => {
        console.log('userInfo: ',userInfo);
        console.log('isError: ', isError);
        console.log('isLoading: ', isLoading);
        if (userInfo) {
            const usr = {
                fullName: userInfo.fullName,
                email: user.email,
                idToken: user.idToken,
                localId: user.localId,
                profileImage: userInfo.profileImage,
                location: {
                    latitude: "",
                    longitude: "",
                }
            }
            setUserData(usr)
        }
    }, [userInfo, isError, isLoading])


    const onLogout = () => {
        localPersistence.clearStorage()
        dispatch(signOut())
    }

    return (
        <View style={styles.container}>
            {user.ProfileImage && <Image source={{ uri: userData.profileImage }} style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center' }} />}
            <Text style={texts.title}>User Profile</Text>
            <Text style={texts.subtitle}>Name: {userData.fullName}</Text>
            <Text style={texts.subtitle}>Email: {userData.email}</Text>
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