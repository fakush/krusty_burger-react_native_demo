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

export const getProductsData = () => async (dispatch) => {
    // get products data from local and DB storage
    const productsLocalData = await localPersistence.jsonGet('productsData')
    const productsDbData = await shopApi.endpoints.getProducts()
    // if db data is not empty, set local data to db data and dispatch setAllProducts
    if (productsDbData.data) {
        console.log('🤡 Usando datos de la db');
        await localPersistence.jsonSave('productsData', productsDbData.data)
        dispatch(setAllProducts(productsDbData.data))
    } else {
        // if db data is empty, and local data is not empty, dispatch setAllProducts
        console.log('🤡 Usando datos locales');
        if (productsLocalData) {
            dispatch(setAllProducts(JSON.parse(productsLocalData)))
        }
    }
};

export default productActions.reducer