import { StyleSheet, Text, View, Modal } from 'react-native'
import DefaultButton from '../Buttons/DefaultButton'
import IconButton from '../Buttons/IconButton'
import React from 'react'
import { colors } from '../../../Global/colors'
import { shadows } from '../../../Global/shadows'


const DefaultModal = ({ title, body, modalVisible, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centerModal}>
                <View style={styles.modalView}>
                    <View style={styles.closeButton}>
                        <IconButton style={styles.closeButton} icon={'close-circle'} color={colors.secondaryAccent} onPress={onClose} />
                    </View>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalBody} >{body}</Text>
                    {/* <View style={styles.buttonRow}>
                        <DefaultButton text='Aceptar' color={colors.secondaryAccent} onPress={onAccept} />
                        <DefaultButton text='Cancelar' color={colors.secondaryAccent} onPress={() => setModalVisible(!modalVisible)} />
                    </View> */}
                </View>
            </View>
        </Modal>
    )
}

export default DefaultModal

const styles = StyleSheet.create({
    closeButton: {
        margin: 5,
        alignSelf: 'flex-end'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10
    },
    centerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        padding: 10,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: colors.primaryAccent,
        ...shadows
    },
    modalTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalBody: {
        padding: 10,
        fontSize: 13,
    }


})