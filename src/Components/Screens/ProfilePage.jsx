import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { texts } from '../../Utils/Global/texts'
import IconButton from '../Common/Buttons/IconButton'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../Redux/Slices/userSlice'
import localPersistence from '../../Services/localPersistenceService'
import { useGetUserByLocalIdQuery } from '../../Services/shopService'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.value)
    const [userData, setUserData] = useState(user)

    const { data: userInfo, isError, isLoading } = useGetUserByLocalIdQuery(user.localId)

    useEffect(() => {
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
            <View style={styles.flexContainer}>
                <Image source={{ uri: `${userData.profileImage || 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/banner3_500.png?alt=media&token=ad452555-133e-4c26-b566-6590280c2d8c'}` }} style={styles.profileImage} />
            </View>
            <View style={styles.flexContainer}>
                <Text style={[texts.title, styles.userText]}>User Profile</Text>
                <Text style={[texts.subtitle, styles.userText]}>Name: {userData.fullName}</Text>
                <Text style={[texts.subtitle, styles.userText]}>Email: {userData.email}</Text>
            </View>
            <IconButton style={styles.logoutButton} icon='logout' text='Logout' onPress={onLogout} />
        </View>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    profileImage: {
        paddingTop: 30,
        paddingBottom: 20,
        width: 250,
        height: 250,
        borderRadius: 125,
        alignSelf: "center",
    },
    flexContainer: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    userText: {
        color: "#772A2B",
        textAlign: "center",
    },
    logoutButton: {
        flex: 1,
        width: "50%"
    }
})