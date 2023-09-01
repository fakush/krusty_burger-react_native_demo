import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterWidget from '../Common/Buttons/CounterWidget'
import { IconButton } from 'react-native-paper'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'

const CartItemComponent = ({ item, onAddToPurchase, onRemoveFromPurchase, onDeleteFromPurchase }) => {
    const itemPrice = item.discount > 0 ? item.price - (item.price * item.discount) : item.price
    return (
        <View style={styles.purchaseOption}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
                <IconButton icon='cancel' size={20} containerColor={red} iconColor='white' onPress={() => onDeleteFromPurchase()} />
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>${Math.round(itemPrice * 100) / 100}</Text>
                {item.discount > 0 &&
                    <Text style={styles.discount}>
                        <Icon name='sale' size={15} type='material-community' color='green' />
                        {item.discount * 100}
                    </Text>
                }
            </View>
            <CounterWidget 
                onCart={item.quantity} 
                onAddToPurchase={onAddToPurchase} 
                onRemoveFromPurchase={onRemoveFromPurchase} 
            />
        </View>
    )
}

export default CartItemComponent

const styles = StyleSheet.create({
    purchaseOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 5,
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