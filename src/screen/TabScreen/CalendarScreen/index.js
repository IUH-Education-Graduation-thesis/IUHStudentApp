import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import DropDownItem from 'react-native-drop-down-item';
import Calendar from './components/Calendar';
import DropDownHK from '../DangKyHPScreen/components/DropDownHK';

const CalendarScreen = () => {

    return (
        <BackgroundView>
            <View style={styles.header}>
                <View>
                    <View style={styles.viewHeader}>
                        <Text style={{ fontSize: 25, height: 50 }}>Lịch theo tuần</Text>
                        <TouchableOpacity style={styles.styleBtn}>
                            <Text style={{ color: "white" }}>Trở về</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.styleBtn}>
                            <Text style={{ color: "white" }}>Hiện tại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.styleBtn}>
                            <Text style={{ color: "white" }}>Tiếp</Text>
                        </TouchableOpacity>
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
    },
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
export default CalendarScreen