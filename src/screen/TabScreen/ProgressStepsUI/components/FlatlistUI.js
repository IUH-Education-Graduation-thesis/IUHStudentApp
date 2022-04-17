import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { CheckBox } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setMonHocID } from '../../../../redux/actions/studentActions';
const FlatlistUI = (prop) => {
    const { data, chitiet } = prop;
    const dispatch = useDispatch();
    const [state, setState] = useState({
        ids: []
    })
    useEffect(() => {
        dispatch(setMonHocID(state.ids));
    }, [state.ids])
    /**
     * Function logic renderItem
     * 
     */
    const isChecked = (itemId) => {
        const isThere = state.ids.includes(itemId);
        return isThere;
    };
    const toggleChecked = (itemId) => {
        const ids = [...state.ids, itemId];
        if (isChecked(itemId)) {
            setState({
                ...state,
                ids: state.ids.filter((id) => id !== itemId),
            });
        } else {
            setState({
                ids,
            });
        }
    };
    const renderItem = ({ item }) => {
        return <View >
            <View style={{ backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
                <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isChecked(item.maHocPhan)}
                    onPress={() => toggleChecked(item.maHocPhan)}
                />
                <View>
                    <Text style={styles.txtRenderChonMH}>{item.maHocPhan} - {item.monHoc.ten}</Text>
                    <Text style={styles.txtRenderChonMH}>Tín chỉ: {item.id}</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={styles.txtRenderChonMH1}>Bắt buộc:</Text>
                        {
                            item.batBuoc ?
                                <AntDesign name='checkcircle' size={25} color={"green"} style={{ marginLeft: 15 }} />
                                :
                                <MaterialIcons name='cancel' size={30} color={"red"} style={{ marginLeft: 15 }} />
                        }
                    </View>
                </View>


            </View>
        </View>
    }
    /**
     * function logic render redernCTMonHoc
     */

    const redernCTMonHoc = ({ item }) => {
        return <View style={{ backgroundColor: 'white', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
            <Text style={styles.txtRenderChonMH}>{item.mahp} - {item.tenMon}</Text>
            <Text style={styles.txtRenderChonMH}>Tín chỉ: {item.tinChi}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.txtRenderChonMH1}>Bắt buộc:</Text>
                {
                    item.batbuoc ?
                        <AntDesign name='checkcircle' size={25} color={"green"} style={{ marginLeft: 15 }} />
                        :
                        <MaterialIcons name='cancel' size={30} color={"red"} style={{ marginLeft: 15 }} />
                }
            </View>
            <Text style={styles.txtRenderChonMH}>GV: {item.tenGV}</Text>
            <Text style={styles.txtRenderChonMH}>Tiết: {item.tiet}</Text>
            <Text style={styles.txtRenderChonMH}>Thứ : {item.thu}</Text>
        </View>

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
    txtRenderChonMH: { color: 'black', fontWeight: "600", fontSize: 18, marginRight: 50 },
    txtRenderChonMH1: { color: 'black', fontWeight: "600", fontSize: 18 },
    container: { backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }
})
export default FlatlistUI