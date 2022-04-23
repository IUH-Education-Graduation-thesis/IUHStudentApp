import { Image, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Text from '../../../../components/Text';
import { IC_ARR_DOWN } from '../../MarkScreen/icons';
import Accordion from 'react-native-collapsible/Accordion';
import { RadioButton } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { BackgroundView } from '../../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../../utils/constantScreenName';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
const DangKyHP = (props) => {
    const title = ["Tên môn học/học phần", "Bắt buộc"]
    const nav = useNavigation();
    const [state, setState] = useState(
        [
            {
                "id": "1",
                "maHocPhan": "40023100156",
                "batBuoc": true,
                "monHoc": {
                    "ten": "Mang may tinh"
                },
                "lopHocPhans": [
                    {
                        "id": "2",
                        "maLopHocPhan": "400231000212",
                        "tenLopHocPhan": "DHKTPM14BTT",
                        "soLuongToiDa": 60,
                        "soNhomThucHanh": 1,
                        "trangThaiLopHocPhan": "Chờ sinh viên đăng ký",
                        "soLuongHienTai": 0,
                        "lopDuKien": null,
                        "giangViens": [
                            {
                                "hoTenDem": "Hoang",
                                "ten": "Anh"
                            }
                        ],
                        "lichHocs": [
                            {
                                "id": "3",
                                "ngayHocTrongTuan": 3,
                                "nhomThucHanh": 0,
                                "thoiGianBatDau": "2021-12-31T00:00:00Z",
                                "thoiGianKetThuc": "2022-04-15T00:00:00Z",
                                "tietHocBatDau": 1,
                                "tietHocKetThuc": 3,
                                "phongHoc": {
                                    "tenPhongHoc": "B3.06"
                                },
                                "isLyThuyet": false
                            }
                        ]
                    },
                    {
                        "id": "6",
                        "maLopHocPhan": "400213000453",
                        "tenLopHocPhan": "DHKTPM14ATT",
                        "soLuongToiDa": 40,
                        "soNhomThucHanh": 2,
                        "trangThaiLopHocPhan": "Chờ sinh viên đăng ký",
                        "soLuongHienTai": 0,
                        "lopDuKien": null,
                        "giangViens": [
                            {
                                "hoTenDem": "Nguyen",
                                "ten": "Hoang"
                            }
                        ],
                        "lichHocs": [
                            {
                                "id": "4",
                                "ngayHocTrongTuan": 6,
                                "nhomThucHanh": 2,
                                "thoiGianBatDau": "2021-12-31T00:00:00Z",
                                "thoiGianKetThuc": "2022-04-15T00:00:00Z",
                                "tietHocBatDau": 4,
                                "tietHocKetThuc": 6,
                                "phongHoc": {
                                    "tenPhongHoc": "B2.03"
                                },
                                "isLyThuyet": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "maHocPhan": "400243001500",
                "batBuoc": false,
                "monHoc": {
                    "ten": "Thống kê máy tính và dữ liệu"
                },
                "lopHocPhans": [
                    {
                        "id": "4",
                        "maLopHocPhan": "400213000452",
                        "tenLopHocPhan": "DHKTPM14CTT",
                        "soLuongToiDa": 80,
                        "soNhomThucHanh": 2,
                        "trangThaiLopHocPhan": "Chờ sinh viên đăng ký",
                        "soLuongHienTai": 0,
                        "lopDuKien": null,
                        "giangViens": [
                            {
                                "hoTenDem": "Nguyen",
                                "ten": "Hoang"
                            }
                        ],
                        "lichHocs": [
                            {
                                "id": "2",
                                "ngayHocTrongTuan": 2,
                                "nhomThucHanh": 0,
                                "thoiGianBatDau": "2021-12-31T00:00:00Z",
                                "thoiGianKetThuc": "2022-04-15T00:00:00Z",
                                "tietHocBatDau": 1,
                                "tietHocKetThuc": 3,
                                "phongHoc": {
                                    "tenPhongHoc": "A1.01"
                                },
                                "isLyThuyet": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "3",
                "maHocPhan": "400243001213",
                "batBuoc": false,
                "monHoc": {
                    "ten": "Co so van hoa"
                },
                "lopHocPhans": [
                    {
                        "id": "5",
                        "maLopHocPhan": "400213000452",
                        "tenLopHocPhan": "DHKTPM14CTT",
                        "soLuongToiDa": 80,
                        "soNhomThucHanh": 2,
                        "trangThaiLopHocPhan": "Chờ sinh viên đăng ký",
                        "soLuongHienTai": 0,
                        "lopDuKien": null,
                        "giangViens": [],
                        "lichHocs": []
                    }
                ]
            },
            {
                "id": "4",
                "maHocPhan": "400243001503",
                "batBuoc": false,
                "monHoc": {
                    "ten": "Cấu trúc dữ liệu và giải thuật"
                },
                "lopHocPhans": []
            }
        ]);
    const [checked, setChecked] = useState(state[0].lopHocPhans.maLopHocPhan);
    const [activeSections, setActiveSections] = useState([]);


    const _renderHeader = section => {
        return (<View key={section.id} style={styles.item} >
            <Text style={styles.title}>{section.monHoc.ten}</Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    section?.batBuoc ?
                        <AntDesign name='checkcircle' size={22} color={"green"} style={{ marginRight: 10 }} />
                        :
                        <MaterialIcons name='cancel' size={25} color={"red"} style={{ marginRight: 10 }} />
                }
                <Image source={IC_ARR_DOWN} />
            </View>
        </View>)
    };
    const setSections = (sections) => {
        // Setting up a active section state
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };
    const _renderContent = item => {
        const { lopHocPhans } = item;
        return lopHocPhans.map((lhp) => {
            return (
                <View>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
                        <RadioButton
                            value={lhp.maLopHocPhan}
                            status={checked === lhp?.maLopHocPhan ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(lhp?.maLopHocPhan)}
                        />
                        <View>
                            <Text style={styles.txtRenderChonMH}>{lhp?.maLopHocPhan} - {item?.monHoc?.ten}</Text>
                            {/* <Text style={styles.txtRenderChonMH}>Tín chỉ: {lopHocPhans.lichHocs}</Text> */}
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={styles.txtRenderChonMH1}>Bắt buộc:</Text>
                                {
                                    item?.batBuoc ?
                                        <AntDesign name='checkcircle' size={20} color={"green"} style={{ marginLeft: 15 }} />
                                        :
                                        <MaterialIcons name='cancel' size={25} color={"red"} style={{ marginLeft: 15 }} />
                                }
                            </View>
                            <Text style={styles.txtRenderChonMH}>GV: {lhp?.giangViens[0]?.hoTenDem + " " + lhp?.giangViens[0]?.ten}</Text>
                            <Text style={styles.txtRenderChonMH}>Tiết: {lhp?.lichHocs[0]?.tietHocBatDau + " - " + lhp?.lichHocs[0]?.tietHocKetThuc}</Text>
                            <Text style={styles.txtRenderChonMH}>Thứ : {lhp?.lichHocs[0]?.ngayHocTrongTuan}</Text>
                            <Text style={styles.txtRenderChonMH}>Phòng học : {lhp?.lichHocs[0]?.phongHoc?.tenPhongHoc}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        )

    };
    const onPress = () => {
        nav.navigate(screenName.dkhp)
    }
    return (
        <BackgroundView>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'baseline', flex: 0.3 }}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <Ionicons name='chevron-back-sharp' size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, height: 60, textAlign: "center", fontWeight: '600', marginLeft: 30 }}>Đăng ký học phần</Text>
            </View>
            <Table borderStyle={{ borderWidth: 1 }}>
                <TableWrapper>
                    <Row data={title} flexArr={[3, 1]} textStyle={styles.text} />
                </TableWrapper>
            </Table>
            <View style={{ flex: 3, }}>
                <ScrollView >
                    <Accordion
                        sections={state}
                        keyExtractory={(item, index) => index}
                        activeSections={activeSections}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={setSections}
                    />
                </ScrollView>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end', paddingTop: 10 }}>
                <TouchableOpacity onPress={onPress} style={{ width: 100, borderRadius: 10, height: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </BackgroundView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',

    },
    title: {
        fontSize: 20
    },
    subitem: {
        backgroundColor: "lightblue",
        paddingBottom: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 32,
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
    },
    contentView: {
        flex: 1.4,
    },
    textHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: "600"
    },
    subtitle1: {
        fontSize: 20,
        fontWeight: '500',
        height: 40,
        backgroundColor: '#bff006',
        marginBottom: 10,

    }, text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black'
    }
});

export default DangKyHP