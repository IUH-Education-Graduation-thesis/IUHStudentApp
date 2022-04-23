import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, TouchableOpacity } from 'react-native';
import Antd from 'react-native-vector-icons/AntDesign'

import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { setDay } from '../../../../redux/actions/studentActions';
const moment = require('moment');

const ShowCalendar = (props) => {
    const { day } = props;
    const dispatch = useDispatch();

    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    useEffect(() => {
        let _day = new Date(date);
        _day.setDate(_day.getDate() + 1);
        dispatch(setDay(_day))
    }, [])

    useEffect(() => {
        if (day) {
            let _day = new Date(day);
            setDate(_day)
        }
    }, [day])
    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        // setDate(value);
        let _day = new Date(value);
        _day.setDate(_day.getDate() + 1);
        setDate(_day)
        dispatch(setDay(_day))
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };

    return (
        <View>

            {/* The button that used to trigger the date picker */}
            {!isPickerShow && (
                <TouchableOpacity onPress={showPicker} style={styles.borderButton}>
                    <Antd name='calendar' size={20} color='black' />
                    <Text style={styles.pickedDate}>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</Text>
                </TouchableOpacity>
            )}

            {/* The date picker */}
            {isPickerShow && (
                <DateTimePicker
                    locale='vi'
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />
            )}
        </View>
    );
};

// Kindacode.com
// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
    },
    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        fontSize: 16,
        color: 'black',
        paddingLeft: 5
    },
    btnContainer: {
        padding: 30,
    },
    borderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 10,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    // This only works on iOS
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default ShowCalendar;