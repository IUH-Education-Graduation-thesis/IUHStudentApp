import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { Component, useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import BackgroundView from '../../../components/BackgroundView';
import CheckBox from '@react-native-community/checkbox';
import DropDownHK from './components/DropDownHK';
const DangKyHPScreen = () => {


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
    const onNextStep = () => {
        console.log('called next step');
    };

    const onPaymentStepComplete = () => {
        console.log('Payment step completed!');
    };

    const onPrevStep = () => {
        console.log('called previous step');
    };

    const onSubmitSteps = () => {
        console.log('called on submit step.');
    };
    const onPress = () => {
        console.log(click);
        if (click === false) {
            setClick(true);
        }
    }
    const getItem = (data, index) => ({
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    });

    const getItemCount = (data) => 50;

    const redernMonHoc = (item) => {
        return <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={styles.txtRenderChonMH}>{item.mahp} - {item.tenMon}</Text>
            <Text style={styles.txtRenderChonMH}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.txtRenderChonMH}>Bắt buộc:</Text>
                <CheckBox
                    value={item.batbuoc}
                />
            </View>

        </TouchableOpacity>

    }
    const redernCTMonHoc = (item) => {
        return <TouchableOpacity style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={styles.txtRenderChonMH}>{item.mahp} - {item.tenMon}</Text>
            <Text style={styles.txtRenderChonMH}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.txtRenderChonMH}>Bắt buộc:</Text>
                <CheckBox
                    value={item.batbuoc}
                />
            </View>
            <Text style={styles.txtRenderChonMH}>GV: {item.tenGV}</Text>
            <Text style={styles.txtRenderChonMH}>Tiết: {item.tiet}</Text>
            <Text style={styles.txtRenderChonMH}>Thứ : {item.thu}</Text>

        </TouchableOpacity>

    }
    const redernChonMonHoc = (item) => {
        return <TouchableOpacity style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={styles.txtRenderChonMH}>{item.mahp} - {item.tenMon}</Text>
            <Text style={styles.txtRenderChonMH}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.txtRenderChonMH}>Bắt buộc:</Text>
                <CheckBox
                    value={item.batbuoc}
                />
            </View>
            <Text style={styles.txtRenderChonMH}>GV: {item.tenGV}</Text>
            <Text style={styles.txtRenderChonMH}>Tiết: {item.tiet}</Text>
            <Text style={styles.txtRenderChonMH}>Thứ : {item.thu}</Text>

        </TouchableOpacity>

    }
    const renderFlatList = () => {
        return <>

            <FlatList
                data={monHoc}
                renderItem={({ item }) => redernMonHoc(item)}
            />
        </>
    }
    const [click, setClick] = useState(false)
    return (
        <BackgroundView>
            <View style={{ flex: 1 }}>
                <ProgressSteps
                    labelColor="black"
                    disabledStepIconColor="#8e8e8e"
                // completedProgressBarColor="#8e8e8e"
                >
                    <ProgressStep
                        // nextBtnText={null}
                        label="Môn học"
                        onNext={click === true ? onPaymentStepComplete() : null}
                        onPrevious={onPrevStep}
                    >
                        <View style={styles.viewStep1}>
                            <Text style={styles.txtheader}>Học kỳ</Text>
                            <DropDownHK />
                        </View>
                        {renderFlatList()}
                    </ProgressStep>
                    <ProgressStep
                        label="Học phần"
                        onNext={onNextStep}
                        onPrevious={onPrevStep}
                        scrollViewProps={defaultScrollViewProps}
                    >
                        <Text>aaa</Text>
                        {/* <FlatList
                            data={lopMonHoc}
                            renderItem={({ item }) => redernMonHoc(item)}
                        /> */}
                    </ProgressStep>
                    <ProgressStep
                        label="Giờ học"
                        onNext={onNextStep}
                        onPrevious={onPrevStep}
                        scrollViewProps={defaultScrollViewProps}
                    >
                        <Text>aaa</Text>
                        {/* <FlatList
                            data={ctLop}
                            renderItem={({ item }) => redernCTMonHoc(item)}
                        /> */}
                    </ProgressStep>
                    <ProgressStep
                        label="Hoàn thành"
                        onPrevious={onPrevStep}
                        onSubmit={onSubmitSteps}
                        scrollViewProps={defaultScrollViewProps}
                    >
                        <Text>aaa</Text>
                        {/* <FlatList
                            data={chonLop}
                            renderItem={({ item }) => redernCTMonHoc(item)}
                        /> */}
                    </ProgressStep>
                </ProgressSteps>
            </View>
        </BackgroundView>
    );

}
const styles = StyleSheet.create({
    viewStep1: { flexDirection: 'row', marginVertical: 10, height: 50, justifyContent: 'space-around', alignItems: "center" },
    txtheader: { color: 'black', fontWeight: "600", fontSize: 18 },
    txtRenderChonMH: { color: 'black', fontWeight: "600", fontSize: 18 }
})
export default DangKyHPScreen