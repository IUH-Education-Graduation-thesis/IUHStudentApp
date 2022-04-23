import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Text from '../../../../components/Text';

const Button = (props) => {
    const { nameIcon, size, textBtn, color, onPress } = props;
    return (
        <TouchableOpacity style={styles.iconView} onPress={onPress}>
            <FontAwesome name={nameIcon} color={color} size={size} style={{ marginRight: 5 }} />
            <Text style={{ fontSize: 16, color: 'black' }}>{textBtn}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    iconView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }
})
export default Button