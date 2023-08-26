import { createSlice } from "@reduxjs/toolkit";

export const orderActions = createSlice({
    name: "Cart",
    initialState: {
        value: {
            userId: "",
            cartArray: [],
            cartTotal: 0,
            cartQuantity: 0,
            cartTimestamp: "",
        }
    },
    reducers: {
        setUserId: (state, action) => {
            state.value.userId = action.payload
        },
        addToCart: (state, action) => {
            const productInCart = state.value.cartArray.find(product => product.id === action.payload.id)
            if (!productInCart) {
                state.value.cartArray.push(action.payload)
            } else {
                state.value.cartArray = state.value.cartArray.map(product => {
                    if (product.id === action.payload.id) {
                        return action.payload
                    }
                    return product
                })
            }
            state.value.cartTimestamp = Date.now()
            state.value.cartQuantity = state.value.cartArray.length
            state.value.cartTotal = state.value.cartArray.reduce((acc, product) => acc + (product.price * product.quantity), 0) 
        },
        removeProductFromCart: (state, action) => {
            state.value.cartArray = state.value.cartArray.filter(product => product.id !== action.payload)
            state.value.cartTimestamp = Date.now()
            state.value.cartQuantity = state.value.cartArray.length
            state.value.cartTotal = state.value.cartArray.reduce((acc, product) => acc + (product.price * product.quantity), 0) 
        },
        emptyCart: (state) => {
            state.value.cartArray = []
            state.value.cartTimestamp = Date.now()
            state.value.cartQuantity = state.value.cartArray.length
            state.value.cartTotal = state.value.cartArray.reduce((acc, product) => acc + (product.price * product.quantity), 0) 
        },
    }
})

export const { setUserId, addToCart, removeProductFromCart, emptyCart } = orderActions.actions

export default orderActions.reducer