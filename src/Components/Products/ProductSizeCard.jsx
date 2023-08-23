import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import CounterWidget from '../Common/Buttons/CounterWidget'
import { Icon } from 'react-native-elements'

const ProductSizeCard = ({ item, onAddToPurchase, onRemoveFromPurchase }) => {
    const itemPrice = item.discount > 0 ? item.price - (item.price * item.discount) : item.price
    return (
        <View style={styles.purchaseOption}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 15 }}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>${Math.round(itemPrice * 100) / 100}</Text>
                {item.discount > 0 &&
                    <Text style={styles.discount}>
                        <Icon name='sale' size={15} type='material-community' color='green' />
                        {item.discount * 100}
                    </Text>
                }
            </View>
            <CounterWidget item={item} onAddToPurchase={onAddToPurchase} onRemoveFromPurchase={onRemoveFromPurchase}/>
        </View>
    )
}

export default ProductSizeCard

const styles = StyleSheet.create({
    purchaseOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: colors.dark,
        ...texts.secondary,
    },
    discount: {
        color: 'green',
        ...texts.secondary,
    }
})