import { createSlice } from "@reduxjs/toolkit";
import localPersistence from "../../Services/localPersistenceService";

export const productActions = createSlice({
    name: "Products",
    initialState: {
        value: {
            categorySelected: "",
            idSelected: "",
            allProducts: "",
            productsSelected: []
        }
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.value.productsSelected = state.value.allProducts.filter(product => product.category === action.payload)
            state.value.categorySelected = action.payload
        },
        setIdSelected: (state, action) => {
            state.value.idSelected = action.payload
        },
        setAllProducts: (state, action) => {
            state.value.allProducts = action.payload
        }
    }
})

export const { setCategorySelected, setIdSelected, setAllProducts } = productActions.actions

export default productActions.reducer