import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { useGetProductsQuery } from '../../Services/shopService';
import ProductGridItem from './ProductGridItem';
import localPersistence from '../../Services/localPersistenceService';
import { useDispatch } from 'react-redux';
import { setAllProducts } from '../../Redux/Slices/productSlice';

const ProductsListGrid = ({navigation}) => {
    const { data, isError, isLoading } = useGetProductsQuery()
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (data) {
            localPersistence.jsonSave('products', data)
            dispatch(setAllProducts(data))
            setProducts(data)
        } else {
            localPersistence.jsonGet('products').then((data) => {
                dispatch(setAllProducts(data))
                setProducts(data)
            })
        }

    }, [data])

    if (!products) {
        return null
    }

    return (
        <>
            {products && 
            <FlatList
                data={products}
                style={styles.container}
                numColumns={3}
                keyExtractor={product => product.id}
                renderItem={({ item }) => <ProductGridItem item={item} navigation={navigation} />}
            />}
        </>
    )
}

export default ProductsListGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
})