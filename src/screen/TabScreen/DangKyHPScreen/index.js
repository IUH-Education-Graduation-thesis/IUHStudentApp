import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import BackgroundView from '../../../components/BackgroundView';
import CheckBox from '@react-native-community/checkbox';
class DangKyHPScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center'
        }
    };
    monHoc = [{
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
    lopMonHoc = [{
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
    ctLop = [{
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
    chonLop = [{
        tenMon: "Pháp luật đại cương",
        tinChi: 3,
        batbuoc: false,
        mahp: 410000124561,
        tenGV: "Nguyễn Quỳnh Mai",
        tiet: "1-3",
        thu: "Thứ 5"
    }]
    onNextStep = () => {
        console.log('called next step');
    };

    onPaymentStepComplete = () => {
        console.log('Payment step completed!');
    };

    onPrevStep = () => {
        console.log('called previous step');
    };

    onSubmitSteps = () => {
        console.log('called on submit step.');
    };
    redernMonHoc = (item) => {
        return <TouchableOpacity onPress={this.defaultScrollViewProps} style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>{item.mahp} - {item.tenMon}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Bắt buộc:</Text>
                <CheckBox
                    value={item.batbuoc}
                />
            </View>

        </TouchableOpacity>

    }
    redernCTMonHoc = (item) => {
        return <TouchableOpacity style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>{item.mahp} - {item.tenMon}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Bắt buộc:</Text>
                <CheckBox
                    value={item.batbuoc}
                />
            </View>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>GV: {item.tenGV}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Tiết: {item.tiet}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Thứ : {item.thu}</Text>

        </TouchableOpacity>

    }
    redernChonMonHoc = (item) => {
        return <TouchableOpacity style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>{item.mahp} - {item.tenMon}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Bắt buộc:</Text>
                <CheckBox
                    value={item.batbuoc}
                />
            </View>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>GV: {item.tenGV}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Tiết: {item.tiet}</Text>
            <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Thứ : {item.thu}</Text>

        </TouchableOpacity>

    }
    render() {
        return (
            <BackgroundView>
                <View style={{ flex: 1 }}>
                    <ProgressSteps>
                        <ProgressStep
                            label="Môn học"
                            onNext={this.onPaymentStepComplete}
                            onPrevious={this.onPrevStep}
                            scrollViewProps={this.defaultScrollViewProps}
                        >
                            < >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', marginVertical: 10 }}>
                                    <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>Học kỳ</Text>
                                    <Text style={{ color: 'black', fontWeight: "600", fontSize: 18 }}>HK2 (2019-2020)</Text>
                                </View>
                                <FlatList
                                    data={this.monHoc}
                                    renderItem={({ item }) => this.redernMonHoc(item)}
                                />
                            </>
                        </ProgressStep>
                        <ProgressStep
                            label="Học phần"
                            onNext={this.onNextStep}
                            onPrevious={this.onPrevStep}
                            scrollViewProps={this.defaultScrollViewProps}
                        >
                            {/* <View style={{ alignItems: 'center' }}> */}
                            <FlatList
                                data={this.lopMonHoc}
                                renderItem={({ item }) => this.redernMonHoc(item)}
                            />
                            {/* </View> */}
                        </ProgressStep>
                        <ProgressStep
                            label="Giờ học"
                            onNext={this.onNextStep}
                            onPrevious={this.onPrevStep}
                            scrollViewProps={this.defaultScrollViewProps}
                        >
                            <FlatList
                                data={this.ctLop}
                                renderItem={({ item }) => this.redernCTMonHoc(item)}
                            />
                        </ProgressStep>
                        <ProgressStep
                            label="Hoàn thành"
                            onPrevious={this.onPrevStep}
                            onSubmit={this.onSubmitSteps}
                            scrollViewProps={this.defaultScrollViewProps}
                        >
                            <FlatList
                                data={this.chonLop}
                                renderItem={({ item }) => this.redernCTMonHoc(item)}
                            />

                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </BackgroundView>
        );
    }
}

export default DangKyHPScreen