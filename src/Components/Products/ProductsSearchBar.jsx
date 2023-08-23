import { Keyboard, StyleSheet, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { colors } from '../../Utils/Global/colors'
import DefaultButton from '../Common/Buttons/DefaultButton'
import IconButton from '../Common/Buttons/IconButton'
import { TextInput } from 'react-native-paper'

const ProductsSearchBar = ({ onSearch, onClear, goBack }) => {
    const [search, setSearch] = useState("")

    const onClearSearch = () => {
        Keyboard.dismiss()
        setSearch("")
        onClear()
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.TextInput} 
                placeholder='Search...' 
                value={search} 
                onChangeText={setSearch}
                onSubmitEditing={() => onSearch(search)}
                right={<TextInput.Icon icon="close-circle" onPress={onClearSearch} color={colors.primary} />}
                />
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
        backgroundColor: colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TextInput: {
        flex: 1,
        height: 35,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        backgroundColor: colors.secondary,
    }
})