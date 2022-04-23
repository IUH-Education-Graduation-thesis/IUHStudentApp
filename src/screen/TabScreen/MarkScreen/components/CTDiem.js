import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CTDiem = (props) => {
    const { ten, diem, style } = props;
    return (
        <View style={styles.view}>
            <Text style={[styles.text, style]}>{ten}</Text>
            <Text style={[styles.text, style]}>{diem}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15,
        paddingVertical: 5
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
})
export default CTDiem