import { View, Text, Modal, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const deviceHeight = Dimensions.get('window').height;
const BottomPopup = (props) => {
    const [isShow, setShow] = useState(false);
    const onTouchOutside = props;
    const show = () => {
        setShow(true);
    }
    const close = () => {
        setShow(false);
    }
    const renderOutsideTouchable = (onTouch) => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) {
            return view;
        }
        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isShow}
            onRequestClose={close}
        >
            <View style={styles.styleView}>
                {renderOutsideTouchable(onTouchOutside)}
                <View style={styles.styleBottom}>
                    <View>
                        <Text style={styles.textDetail}>Chi tiết kết quả môn học</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    styleView: {
        flex: 1,
        backgroundColor: "#000000AA",
        justifyContent: "flex-end"
    },
    styleBottom: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 0.4
    },
    textDetail: {
        color: '#182E44',
        fontSize: 30,
        fontWeight: '600',
        margin: 15
    }
})
export default BottomPopup