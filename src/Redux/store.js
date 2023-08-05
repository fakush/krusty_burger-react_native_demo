import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './Actions/productActions'

export default configureStore({
    reducer: {
        productsReducer
    }
})