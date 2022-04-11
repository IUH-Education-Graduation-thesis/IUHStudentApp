import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import DropDownHK from './components/DropDownHK';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import Text from '../../../components/Text';
const DangKyHPScreen = () => {
    const nav = useNavigation()
    const title = ["STT", "Mã lớp học phần", "Tên môn học/học phần", "TC"]
    return (
        <BackgroundView>
            <View style={{ flex: 0.2 }}>
                <View style={styles.headerView}>
                    <Text style={styles.textHeader}>Đăng ký học phần</Text>
                </View>
                <View style={styles.viewStep1}>
                    <TouchableOpacity style={styles.styleBtn} onPress={() => nav.navigate(screenName.stepDKHP)}>
                        <Text style={{ color: "white", fontSize: 15, fontWeight: '700' }}>ĐKHP</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtheader}>Học kỳ</Text>
                    <DropDownHK />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.textMH}>Môn học đã đăng ký</Text>
                <Table borderStyle={{ borderWidth: 1 }}>
                    <TableWrapper>
                        <Row data={title} flexArr={[0.5, 2, 2.5, 0.5]} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
            </View>
        </BackgroundView>
    );

}
const styles = StyleSheet.create({
    styleBtn: {
        backgroundColor: "#1da1f2",
        borderRadius: 5,
        width: 70,
        height: 30,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 4
    },
    textHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: "600"
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
        marginBottom: 5,
    },
    viewStep1: { flexDirection: 'row', marginVertical: 10, height: 30, justifyContent: 'space-around', alignItems: "center" },
    txtheader: { color: 'black', fontWeight: "600", fontSize: 18 },
    textMH: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        marginBottom: 6,
        textAlign: 'center'
    },
    title: { flex: 1, alignItems: 'flex-start' },
    text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black'
    }
})
export default DangKyHPScreen