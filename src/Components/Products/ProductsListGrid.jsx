import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { useGetProductsQuery } from '../../Services/shopService';
import ProductGridItem from './ProductGridItem';

const ProductsListGrid = ({navigation}) => {
    const { data, isError, isLoading } = useGetProductsQuery()
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(data)
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