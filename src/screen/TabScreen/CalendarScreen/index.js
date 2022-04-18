import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import Button from './components/Button';
// import { DatePicker } from 'antd';
import { IC_ARR_DOWN } from '../MarkScreen/icons';
import { ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Image } from 'react-native';
import { DatePicker } from 'native-base';
import Antd from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native';
import queries from '../../../core/GraphQl';
import { GETLICHHOC } from './fragment';
import { useLazyQuery, useQuery } from '@apollo/client';

const getLichHocQuery = queries.query.getLichHoc(GETLICHHOC);

const CalendarScreen = () => {
    const sample = [
        {
            "thu": "Thứ 2",
            "thuNumber": 2,
            "listLichHoc": []
        },
        {
            "thu": "Thứ 3",
            "thuNumber": 3,
            "listLichHoc": []
        },
        {
            "thu": "Thứ 4",
            "thuNumber": 4,
            "listLichHoc": []
        },
        {
            "thu": "Thứ 5",
            "thuNumber": 5,
            "listLichHoc": []
        },
        {
            "thu": "Thứ 6",
            "thuNumber": 6,
            "listLichHoc": []
        },
        {
            "thu": "Thứ 7",
            "thuNumber": 7,
            "listLichHoc": []
        },
        {
            "thu": "Chủ Nhật",
            "thuNumber": 8,
            "listLichHoc": []
        }
    ];
    let today = new Date();
    // const [actGetLichHoc, { data: dataLichHoc, loading: loadingdataLichHoc, error: errordataLichHoc }] = useLazyQuery(getLichHocQuery);

    // console.log(dataLichHoc);
    const [date, setDate] = useState(new Date());



    const [state, setState] = useState({
        activeSections: [],
        showPickerCheck: false,
    });
    const _renderHeader = section => (
        <View key={section} style={styles.item} >
            <Text style={styles.title}>{section.thu}</Text>
            <Image source={IC_ARR_DOWN} />
        </View>
    );

    const _renderContent = section => {
        return section.listLichHoc.map((item, index) => {
            if (index > -1) {
                return (
                    <TouchableWithoutFeedback key={index} onPress={onShowUp} style={styles.subitem}>
                        <Text style={styles.subtitle1}>{item}</Text>
                    </TouchableWithoutFeedback>
                );
            }
        });
    };
    const _updateSections = activeSections => {
        setState({ activeSections });
    };
    const _onDateChange = (e, newDate) => {
        setDate(newDate);
    };


    return (
        <BackgroundView>
            <View style={styles.header}>
                <View>
                    <View style={styles.headerView}>
                        <Text style={styles.textHeader}>Lịch theo tuần</Text>

                    </View>
                    <View style={styles.viewHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, marginLeft: 5 }}>
                            <Antd name='calendar' size={20} color='black' />
                            <DatePicker

                                locale={'vi'}
                                animationType={'fade'}
                                androidMode={'default'}
                                placeHolderText={today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()}
                                textStyle={{ color: 'red' }}
                                placeHolderTextStyle={{ color: 'black' }}
                                disabled={false}
                                onChange={_onDateChange}
                                value={date}
                                onConfirm={(date) => {
                                    // setOpen(false)
                                    setState({ showPickerCheck: false })
                                }}
                            />
                        </View>
                        <Button textBtn="Lịch học" />
                        <Button textBtn="Hiện tại" />
                        <Button textBtn="Lịch thi" />
                    </View>

                    <ScrollView>
                        <Accordion
                            sections={sample}
                            keyExtractory={(item, index) => index}
                            activeSections={state.activeSections}
                            renderHeader={_renderHeader}
                            renderContent={_renderContent}
                            onChange={_updateSections}
                        />
                    </ScrollView>
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
    item: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
        marginBottom: 5,
    }
    ,
    title: {
        fontSize: 15,
        color: 'black'
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    }, datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: "600"
    }
})
export default CalendarScreen