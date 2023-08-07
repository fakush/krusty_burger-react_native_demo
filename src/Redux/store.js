import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import productsReducer from './Actions/productActions'
import { shopApi } from '../Services/shopService'
import { authApi } from '../Services/authService'

export default configureStore({
    reducer: {
        productsReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch)