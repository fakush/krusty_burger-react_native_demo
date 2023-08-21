import { FlatList, Keyboard, StyleSheet, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { colors } from '../../Utils/Global/colors'
import ProductListCard from '../Products/ProductListCard'
import ProductsSearchBar from '../Products/ProductsSearchBar'
import DefaultModal from '../Common/Modals/DefaultModal'
import { useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../../Services/shopService'

const searchValidation = (keyword) => {
    if (keyword.length < 3) {
        return false
    }
    const regex = /^[a-zA-Z0-9 ]+$/
    return regex.test(keyword)
}

const ProductsList = ({ navigation, route }) => {
    const { category } = route.params

    const { data: productsSelected, isError, isLoading } = useGetProductsByCategoryQuery(category)
    
    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [keywordError, setKeywordError] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const onCloseError = () => {
        setModalVisible(false)
        setKeywordError("")
        setKeyword("")
    }

    useEffect(() => {
        const filterProducts = productsSelected ? productsSelected.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase())): []
        setProducts(filterProducts)
    }, [productsSelected, keyword])

    const onSearch = (keyword) => {
        Keyboard.dismiss()

        if (searchValidation(keyword)) {
            setKeywordError("")
            return setKeyword(keyword)
        }
        if (keyword === "") {
            return setKeyword("")
        }
        if (!keyword) {
            setModalVisible(true)
            return setKeywordError("Keyword must be at least 3 characters long and only contain letters, numbers and spaces")
        }
        else {
            setModalVisible(true)
            setKeywordError("Keyword must be at least 3 characters long and only contain letters, numbers and spaces")
        }
    }

    const onClear = () => {
        onSearch("")
    }

    return (
        <View style={styles.container}>
            <ProductsSearchBar onSearch={onSearch} onClear={onClear} goBack={() => navigation.goBack()} />
            <FlatList
                data={products}
                keyExtractor={product => product.id}
                renderItem={({ item }) => ProductListCard({ item, navigation })} />
            {keywordError && <DefaultModal title='Error' body={keywordError} modalVisible={modalVisible} onClose={onCloseError} />}
        </View>
    )
}

export default ProductsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondary,
        padding: 10,
    }
})