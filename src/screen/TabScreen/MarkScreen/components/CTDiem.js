import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { render } from 'react-dom';
import { isArray } from 'lodash';

const CTDiem = (props) => {
    const { ten, diem, style } = props;
    const renderDiem = () => {
        if (isArray(diem)) {
            return diem.map((item, index) => {
                return <Text style={[styles.text, { margin: 0 }]}>{diem ? Math.round(item * 10) / 10 + " | " : ""}</Text>
            });
        }
        return <Text style={[styles.text, style]}>{diem ? Math.round(diem * 10) / 10 + "" : ""}</Text>

    }
    return (
        <View style={styles.view}>
            <Text style={[styles.text, style]}>{ten}</Text>
            <View style={{ flexDirection: 'row' }}>
                {renderDiem()}
            </View>
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