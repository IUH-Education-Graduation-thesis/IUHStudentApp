import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = (props) => {
    const { textBtn } = props;
    return (
        <TouchableOpacity style={styles.styleBtn}>
            <Text style={{ color: "white" }}>{textBtn}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    styleBtn: {
        backgroundColor: "#1da1f2",
        borderRadius: 5,
        width: 60,
        height: 30,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 4
    }
})
export default Button