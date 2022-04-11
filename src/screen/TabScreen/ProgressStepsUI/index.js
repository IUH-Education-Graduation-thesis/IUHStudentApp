import { Image, LogBox, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { BackgroundView } from '../../../components';
import FlatlistUI from './components/FlatlistUI';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import { useSelector } from 'react-redux';
import { getListMonHocSelectors } from '../../../redux/selectors/selectorStudents';
import LopHocPhan from './components/LopHocPhan';
import queries from "../../../core/GraphQl"
import { GETLOPHOCPHANFRAGMENT } from './fragment';
import { useLazyQuery, useQuery } from '@apollo/client';

const ProgressStepsUI = () => {

    /**
     *  const
     */
    const nav = useNavigation();
    const [currentActive, setCurrentActive] = useState(0)

    const [state, setState] = useState({
        activeSections: [],
        hocPhan: [
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
                    "ten": "Thống kê máy tính và dữ liệu"
                },
                "lopHocPhans": []
            }
        ],

    });

    /**
    * UseEffect
    * ==========================================
    */

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    /**
     * function
     */

    const onNextStep = () => {

        console.log('Payment step completed!');
    };

    const onPaymentStepComplete = () => {

        console.log("null");
    };

    const onPrevStep = () => {
        setCurrentActive(currentActive - 1)
    };

    const onSubmitSteps = () => {
        console.log('called on submit step.');
        nav.navigate(screenName.dkhp)
    };


    /**
     * render UI
     */
    return (
        <BackgroundView>

            <ProgressSteps
                labelColor="#393939"
                disabledStepIconColor="#757575"
                progressBarColor="#757575"
            >
                <ProgressStep
                    label="Học phần"
                    onNext={onPaymentStepComplete()}
                    onPrevious={onPrevStep}
                    nextBtnText="Tiếp tục"
                >
                    <FlatlistUI data={state.hocPhan} chitiet={false} />
                </ProgressStep>
                <ProgressStep
                    label="Lớp học phần"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    previousBtnText="Trở về"
                    nextBtnText="Tiếp tục"
                    previousBtnStyle={{ textAlign: 'center', padding: 8 }}
                >
                    <LopHocPhan data={state.hocPhan} />
                </ProgressStep>
                <ProgressStep
                    label="Chi tiết lớp học"
                    onPrevious={onPrevStep}
                    onSubmit={onSubmitSteps}
                    previousBtnText="Trở về"
                >
                    <FlatlistUI
                        data={state.hocPhan}
                        chitiet={true}
                    />
                </ProgressStep>
            </ProgressSteps>
        </BackgroundView>
    )
}
const styles = StyleSheet.create({
    viewStep1: { flexDirection: 'row', marginVertical: 10, height: 30, justifyContent: 'space-around', alignItems: "center" },
    txtheader: { color: 'black', fontWeight: "600", fontSize: 18 },
    txtRenderChonMH: { color: 'black', fontWeight: "600", fontSize: 18 },
    item: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 20
    }, title: {
        fontSize: 16
    },
    subtitle1: {
        fontSize: 16,
        fontWeight: '500',
        height: 20,
        marginBottom: 10,
        alignItems: 'center',
    }, subitem: {
        backgroundColor: "lightblue",
        paddingBottom: 20,
        marginVertical: 8,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
})
export default ProgressStepsUI