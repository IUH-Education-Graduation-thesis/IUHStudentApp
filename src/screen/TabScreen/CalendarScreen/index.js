import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import DropDownItem from 'react-native-drop-down-item';
import Calendar from './components/Calendar';

const CalendarScreen = () => {

    return (
        <BackgroundView>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 25, textAlign: 'center' }}>Lịch theo tuần</Text>
                    <Calendar />
                </View>
            </View>

        </BackgroundView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    styleDropItem: {
        marginTop: 10,
        backgroundColor: "white",
        paddingLeft: 20,
        marginHorizontal: 10,

    },
    header: {
        flex: 1
    }
})
export default CalendarScreen