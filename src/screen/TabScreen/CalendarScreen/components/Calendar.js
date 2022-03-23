import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React, { useState } from 'react'
import { CalendarList, Agenda, DateData } from 'react-native-calendars';
import { number } from 'yup';
import { Card, Avatar } from 'react-native-paper';

export default function Calendar() {
    const [items, setItems] = useState(
        {
            '2022-03-13': [{ type: true, name: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' }],
            '2022-03-16': [{ type: true, name: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' }],
            '2022-03-17': [],
            '2022-03-14': [],
            '2022-03-15': [{ type: false, name: 'Phương pháp tính', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Đỗ Sơn' },
            { type: true, name: 'Kiểm thử phần mềm', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '4-6', phong: 'A1.05', giangVien: 'Châu Thị Bảo Hà' },
            { type: false, name: 'Lập trình WWW', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '7-9', phong: 'A1.05', giangVien: 'Đặng Thị Thu Hà' }],
            '2022-03-18': [{ type: true, name: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' },
            { type: false, name: 'Công nghệ mới', maHocPhan: '400200123157-DHKTPM14BTT', tiet: '1-3', phong: 'A1.05', giangVien: 'Tôn Long Phước' }],
            '2022-03-19': [],
            '2022-03-20': [],
            '2022-03-21': [],
            '2022-03-22': [],
        }
    )


    const renderItem = (items) => {
        return (
            <View style={[styles.item, items.type ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' }]}>
                <Text >{items.name}</Text>
                <Text >Mã học phần: {items.maHocPhan}</Text>
                <Text >Tiết: {items.tiet}</Text>
                <Text >Phòng: {items.phong}</Text>
                <Text >Giảng Viên: {items.giangVien}</Text>
            </View>
        )
    }

    return (
        <View style={{ width: "100%", height: "95%" }}>
            <Agenda
                items={items}
                selected={Date.now()}
                renderItem={renderItem}

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