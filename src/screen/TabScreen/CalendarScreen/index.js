import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import DropDownItem from 'react-native-drop-down-item';
import Calendar from './components/Calendar';
import DropDownHK from '../DangKyHPScreen/components/DropDownHK';
import Button from './components/Button';

const CalendarScreen = () => {

    return (
        <BackgroundView>
            <View style={styles.header}>
                <View>
                    <View style={styles.viewHeader}>
                        <Text style={{ fontSize: 25, height: 50 }}>Lịch theo tuần</Text>
                        <Button textBtn="Lịch học" />
                        <Button textBtn="Lịch thi" />
                        <Button textBtn="Hiện tại" />
                    </View>
                    <Calendar isDate={true} />
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
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        height: 50,
    }
})
export default CalendarScreen