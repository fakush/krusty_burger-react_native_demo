import { createSlice } from "@reduxjs/toolkit";
import localPersistence from "../../Services/localPersistenceService";

export const userActions = createSlice({
    name: "User",
    initialState: {
        value: { fullName: "", email: "", idToken: "", localId: "", profileImage: "", location: { latitude: "", longitude: "", address: "" } }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        signOut: (state) => {
            state.value = {
                fullName: "",
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
        setUserLocation: (state, action) => {
            state.value.location = action.payload
        }
    }
})

export const {
    setUser,
    signOut,
    setUserLocation
} = userActions.actions

export const getLocalUserData = () => async (dispatch) => {
        const dataFromStorage = await localPersistence.getJson('user')
        if (dataFromStorage) { dispatch(setUser(dataFromStorage)) } 
};

export default userActions.reducer