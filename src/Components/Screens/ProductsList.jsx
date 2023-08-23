import { FlatList, Keyboard, Image, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { colors } from '../../Utils/Global/colors'
import ProductsSearchBar from '../Products/ProductsSearchBar'
import DefaultModal from '../Common/Modals/DefaultModal'
import { useGetProductsByCategoryQuery } from '../../Services/shopService'
import ProductGridItem from '../Products/ProductGridItem'
import { texts } from '../../Utils/Global/texts'

const searchValidation = (keyword) => {
    if (keyword.length < 3) {
        return false
    }
    const regex = /^[a-zA-Z0-9 ]+$/
    return regex.test(keyword)
}

const ProductsList = ({ navigation, route }) => {
    const { category } = route.params

    const { data: productsSelected, isError, isLoading } = useGetProductsByCategoryQuery(category.name)
    
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
            <Image style={styles.image} source={{ uri: category.banner }} />

            <Text style={[texts.subtitle, styles.text]}>{category.name}</Text>
            <ProductsSearchBar onSearch={onSearch} onClear={onClear} goBack={() => navigation.goBack()} />
            <FlatList
                data={products}
                keyExtractor={product => product.id}
                numColumns={3}
                renderItem={({ item }) => ProductGridItem({ item, navigation })} />
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
        paddingBottom: 60,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        color: "#772A2B",
        fontWeight: 'bold',
    },
})