import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { colors } from '../../Global/colors'
import DefaultButton from '../Common/Buttons/DefaultButton'
import IconButton from '../Common/Buttons/IconButton'

const ProductsSearchBar = ({ onSearch, onClear, goBack }) => {
    const [search, setSearch] = useState("")

    const onClearSearch = () => {
        Keyboard.dismiss()
        setSearch("")
        onClear()
    }
    
    return (
        <View style={styles.container}>
            <IconButton icon='arrow-left-circle' color={'black'} onPress={goBack} />
            <TextInput style={styles.TextInput} placeholder='Search...' value={search} onChangeText={setSearch} />
            <DefaultButton icon='card-search' text='Find' color={colors.primary} onPress={() => onSearch(search)} />
            <IconButton icon='close-circle' color={'black'} onPress={onClearSearch} />
        </View>
    )
}

export default ProductsSearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.primaryAccent,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TextInput: {
        flex: 1,
        height: 35,
        borderBottomColor: colors.gray,
        borderBottomWidth: 3,
    }
})