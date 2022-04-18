import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundView from '../../../components/BackgroundView';
import DropDownItem from 'react-native-drop-down-item';
import Calendar from './components/Calendar';
import DropDownHK from '../DangKyHPScreen/components/DropDownHK';
import Button from './components/Button';
import DatePicker from '@react-native-community/datetimepicker';

const CalendarScreen = () => {

    const [date, setDate] = useState(null);
    useEffect(() => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        setDate(date);
    }, []);
    console.log("date", date);
    return (
        <BackgroundView>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 25, height: 50 }}>Lịch theo tuần</Text>
                    <View style={styles.viewHeader}>
                        <Button textBtn="Lịch học" />
                        <Button textBtn="Lịch thi" />
                        <Button textBtn="Hiện tại" />
                    </View>
                    <DatePicker
                        value={new Date()}
                        style={styles.datePicker}
                        defaultDate={new Date(2022, 4, 18)}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        textStyle={{ color: 'black' }}
                        placeHolderTextStyle={{ color: 'black' }}
                        placeHolderText="wew"
                        disabled={false}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    {/* <Calendar isDate={true} /> */}
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
    }, datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

})
export default CalendarScreen