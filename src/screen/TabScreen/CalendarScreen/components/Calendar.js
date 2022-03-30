import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CalendarList, Agenda, DateData } from 'react-native-calendars';
import { number } from 'yup';
import { Card, Avatar } from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const Calendar = (props) => {

    const [items, setItems] = useState(
        {
            '2022-03-13': [{ type: true, tenMonHoc: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' }],
            '2022-03-16': [{ type: true, tenMonHoc: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' }],
            '2022-03-15': [{ type: false, tenMonHoc: 'Phương pháp tính', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Đỗ Sơn' },
            { type: true, tenMonHoc: 'Kiểm thử phần mềm', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '4-6', phong: 'A1.05', giangVien: 'Châu Thị Bảo Hà' },
            { type: false, tenMonHoc: 'Lập trình WWW', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '7-9', phong: 'A1.05', giangVien: 'Đặng Thị Thu Hà' }],
            '2022-03-18': [{ type: true, tenMonHoc: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' },
            { type: false, tenMonHoc: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' }],
        }
    )


    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    items[strTime].push({
                        name: 'Item for ' + strTime + ' #' + 1,
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                    });
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 10);
    };
    const renderItem = (items) => {
        return (
            <View style={[styles.item, items.type ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' }]}>
                <Text >{items.tenMonHoc}</Text>
                {items.tenMonHoc ? <>
                    <Text >Mã học phần: {items.maHocPhan}</Text>
                    <Text >Tiết: {items.tiet}</Text>
                    <Text >Phòng: {items.phong}</Text>
                    <Text >Giảng Viên: {items.giangVien}</Text>
                </> : <View />}
            </View>
        )
    }
    return (
        <View style={{ width: "100%", height: "95%" }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={Date.now()}
                renderItem={renderItem}
                scrollEnabled={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,

    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
})
export default Calendar;