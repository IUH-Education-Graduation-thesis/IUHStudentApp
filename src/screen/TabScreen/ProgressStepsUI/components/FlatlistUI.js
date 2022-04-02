import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import CheckBox from '@react-native-community/checkbox';
const FlatlistUI = (prop) => {
    const { data, onPress, chitiet } = prop;
    console.log(chitiet);
    const renderItem = ({ item }) => {
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
    const redernCTMonHoc = ({ item }) => {
        return <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
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
    return (
        <FlatList
            data={data}
            renderItem={chitiet ? redernCTMonHoc : renderItem}

        />
    )
}
const styles = StyleSheet.create({
    viewStep1: { flexDirection: 'row', marginVertical: 10, height: 30, justifyContent: 'space-around', alignItems: "center" },
    txtheader: { color: 'black', fontWeight: "600", fontSize: 18 },
    txtRenderChonMH: { color: 'black', fontWeight: "600", fontSize: 18 }
})
export default FlatlistUI