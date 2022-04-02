import { FlatList, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import CheckBox from '@react-native-community/checkbox';
import { BackgroundView } from '../../../components';
import FlatlistUI from './components/FlatlistUI';
import { AntDesign } from "react-native-vector-icons/AntDesign"
const ProgressStepsUI = () => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center'
        }
    };
    const monHoc = [{
        mahp: 410000124561,
        tenMon: "Chung chi Toeic",
        tinChi: 5,
        batbuoc: true,
    },
    {
        tenMon: "Pháp luật đại cương",
        tinChi: 2,
        batbuoc: false,
        mahp: 410000124561,
    },
    {
        tenMon: "Quản trị kinh doanh",
        tinChi: 3,
        batbuoc: true,
        mahp: 410000124561,
    },
    {
        tenMon: "Chung chi Toeic",
        tinChi: 5,
        batbuoc: true,
        mahp: 410000124561,
    },
    {
        tenMon: "Pháp luật đại cương",
        tinChi: 2,
        batbuoc: false,
        mahp: 410000124561,
    },
    {
        tenMon: "Quản trị kinh doanh",
        tinChi: 3,
        batbuoc: true,
        mahp: 410000124561,
    }]
    const lopMonHoc = [{
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124561,
    },
    {
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124564,
    },
    {
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124564,
    },
    {
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124562,
    },
    {
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124563,
    }]
    const ctLop = [{
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124561,
        tenGV: "Nguyễn Quỳnh Mai",
        tiet: "1-3",
        thu: "Thứ 5"
    }, {
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124561,
        tenGV: "Nguyễn Quỳnh Mai",
        tiet: "4-6",
        thu: "Thứ 5"
    }]
    const chonLop = [{
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124561,
        tenGV: "Nguyễn Quỳnh Mai",
        tiet: "1-3",
        thu: "Thứ 5"
    }]
    const [currentActive, setCurrentActive] = useState(0)
    const onNextStep = () => {
        console.log('called next step');
    };

    const onPaymentStepComplete = () => {
        console.log('Payment step completed!');
    };

    const onPrevStep = () => {
        setCurrentActive(currentActive - 1)
    };

    const onSubmitSteps = () => {
        console.log('called on submit step.');
    };
    const onPress = () => {
        setCurrentActive(currentActive + 1)
    }


    return (
        <BackgroundView>

            <ProgressSteps
                labelColor="#393939"
                disabledStepIconColor="#757575"
                activeStep={currentActive}
                progressBarColor="#757575"
            >

                <ProgressStep
                    label="Môn học"
                    onNext={onPaymentStepComplete()}
                    onPrevious={onPrevStep}
                    removeBtnRow={true}
                    scrollable={false}
                >

                    <FlatlistUI data={monHoc} onPress={onPress} chitiet={false} />
                </ProgressStep>
                <ProgressStep
                    nextBtnText={null}
                    label="Học phần"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    previousBtnText="Trở về"
                    previousBtnStyle={{ textAlign: 'center', padding: 8 }}
                >
                    <FlatlistUI
                        data={lopMonHoc}
                        onPress={onPress}
                        chitiet={false}
                    />
                </ProgressStep>
                <ProgressStep
                    nextBtnText={null}
                    label="Giờ học"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    previousBtnText="Trở về"
                >
                    <FlatlistUI
                        data={ctLop}
                        onPress={onPress}
                        chitiet={true}
                    />
                </ProgressStep>
                <ProgressStep
                    label="Hoàn thành"
                    onPrevious={onPrevStep}
                    onSubmit={onSubmitSteps}
                    previousBtnText="Trở về"
                >
                    <FlatlistUI
                        data={chonLop}
                        onPress={onPress}
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
    txtRenderChonMH: { color: 'black', fontWeight: "600", fontSize: 18 }
})
export default ProgressStepsUI