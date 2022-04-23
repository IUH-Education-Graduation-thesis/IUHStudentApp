import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import Button from './components/Button';
import { IC_ARR_DOWN } from '../MarkScreen/icons';
import { ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Image } from 'react-native';
import queries from '../../../core/GraphQl';
import { GETLICHHOC } from './fragment';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import Text from '../../../components/Text';
import ShowCalendar from './components/ShowCalendar';
import { useSelector } from 'react-redux';
import { getDay } from '../../../redux/selectors/selectorStudents';
import { COLORS } from '../../../themes/color';

const moment = require('moment');
const getLichHocQuery = queries.query.getLichHoc(GETLICHHOC);
const CalendarScreen = () => {

    /**
     * Const
     */

    const [state, setState] = useState({

        showPickerCheck: false,
    });
    const [activeSections, setActiveSections] = useState([]);
    let today = new Date();
    /**
     * use State/Selector/...
     */
    const day = useSelector(getDay);
    const [date, setDate] = useState(today.toISOString());
    useEffect(() => {
        if (day) {
            var nowDate = new Date(day);
            nowDate.setDate(day.getDate() + 1);
            setDate(nowDate.toISOString());
        }
    }, [day])
    /**
     * call query/ mutation
     */
    const { data: getdataLichHoc, loading: loadingLichHoc } = useQuery(getLichHocQuery, {
        variables: {
            ngay: `${date}`,
        }
    });
    const dataLichHoc = getdataLichHoc?.getLichHoc?.data || [];
    /**
     * 
     * function
     */
    const _renderHeader = section => (
        <View key={section} style={styles.item} >
            <Text style={styles.title}>{section.thu}</Text>
            <Image source={IC_ARR_DOWN} />
        </View>
    );

    const _renderContent = section => {
        console.log(section.listLichHoc);
        return section.listLichHoc.map((item, index) => {
            console.log(item.tietHocKetThuc);
            if (!isEmpty(item?.lopHocPhan)) {
                return (
                    <View key={index} style={styles.viewContentAccordion}>

                        <Text style={styles.textTitle}>{item?.lopHocPhan?.tenLopHocPhan}</Text>
                        <Text >{item?.lopHocPhan?.maLopHocPhan + " - " + item?.lopHocPhan?.tenLopHocPhan}</Text>
                        <Text style={styles.subtitle1}>{"Tiết: " + item?.tietHocBatDau + "-" + item?.tietHocKetThuc}</Text>
                        <Text style={styles.subtitle1}>{"Phòng: " + item?.phongHoc?.tenPhongHoc}</Text>
                        <Text style={styles.subtitle1}>{"Giảng viên: " + item?.lopHocPhan?.giangViens[0].hoTenDem + " " + item?.lopHocPhan?.giangViens[0].ten}</Text>
                        <Text style={styles.subtitle1}>{"Ghi chú: "}</Text>

                    </View>
                );
            } else {
                return <View style={{ width: '100%', height: 30, backgroundColor: 'white' }} />
            }
        });
    };
    const _updateSections = activeSections => {
        setActiveSections(
            activeSections.includes(undefined) ? [] : activeSections
        );
    };

    const onPress = (type) => {
        if (type == 'pre') {
            var yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 7);
            setDate(yesterday.toISOString())
        } else if (type == 'now') {
            var now = new Date(today);
            now.setDate(now.getDate());
            setDate(now.toISOString())
        } else {
            var next = new Date(date);
            next.setDate(next.getDate() + 7);
            setDate(next.toISOString())
        }

    }
    /**
     * render ui
     */
    return (
        <BackgroundView>
            <View style={styles.header}>
                <View>
                    <View style={styles.headerView}>
                        <Text style={styles.textHeader}>Lịch theo tuần</Text>

                    </View>
                    <View style={styles.viewHeader}>
                        <ShowCalendar day={date} />
                        <Button textBtn="< Trở về" onPress={() => onPress('pre')} />
                        <Button textBtn="Hiện tại" onPress={() => onPress('now')} />
                        <Button textBtn="Tiếp >" onPress={() => onPress('next')} />
                    </View>

                    <ScrollView>
                        {!isEmpty(dataLichHoc)
                            ? <Accordion
                                sections={dataLichHoc}
                                keyExtractory={(item, index) => index}
                                activeSections={activeSections}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                            />
                            : <View>
                                <Text>Loading...</Text>
                            </View>}
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
    textTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#f3d27a'
    }
    ,
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
    subitem: {
        paddingBottom: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    viewContentAccordion:
    {
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 4,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginHorizontal: 10,
        paddingVertical: 10
    }
})
export default CalendarScreen