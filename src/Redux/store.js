import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import productsReducer from './Slices/productSlice'
import userReducer, { getLocalUserData } from './Slices/userSlice'
import ordersReducer from './Slices/orderSlice'
import { shopApi } from '../Services/shopService'
import { authApi } from '../Services/authService'

const store = configureStore({
    reducer: {
        productsReducer,
        userReducer,
        ordersReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
})

store.dispatch(getLocalUserData())

export default store

setupListeners(configureStore.dispatch)