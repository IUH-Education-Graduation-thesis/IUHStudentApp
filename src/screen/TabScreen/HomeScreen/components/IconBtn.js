import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import Text from '../../../../components/Text'
export const tpyeIcon = {
    octicons: "Octicons",
}
const IconBtn = (props) => {
    const { nameIcon, size, tpye, text } = props
    const renderIcon = () => {
        switch (tpyeIcon) {
            // case tpye:
            //     return <Octicons name={nameIcon} size={size} color="gray" />
            default:
                return (
                    <View style={styles.iconView}>
                        <Octicons name={nameIcon} size={size} color="white" />
                    </View>
                );
        }
    }
    return (
        <TouchableOpacity style={styles.btnStyle}>
            {renderIcon()}
            <Text style={{ textAlign: 'center', fontSize: 16, }}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    iconView: {
        backgroundColor: '#fe2c2c',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    btnStyle: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default IconBtn