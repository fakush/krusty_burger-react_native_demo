import { createSlice } from "@reduxjs/toolkit";

export const userActions = createSlice({
    name: "User",
    initialState: {
        value: {
            email: "",
            idToken: "",
            localId: "",
            profileImage: "",
            location: {
                latitude: "",
                longitude: "",
                address: ""
            },
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        signOut: (state) => {
            state.value = {
                email: "",
                idToken: "",
                localId: "",
                profileImage: "",
                location: {
                    latitude: "",
                    longitude: "",
                    address: ""
                },
            }
        },
        saveImage: (state, action) => {
            state.value.profileImage = action.payload
        },
        setUserLocation: (state, action) => {
            state.value.location = action.payload
        }
    }
})

export const {
    setUser,
    signOut,
    saveImage,
    setUserLocation
} = userActions.actions

export default userActions.reducer