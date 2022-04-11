import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { CheckBox } from 'react-native-elements';
import { getListMonHocSuccess } from '../../../../redux/actions/studentActions';
import { useDispatch, useSelector } from 'react-redux';
import { getListMonHocSelectors } from '../../../../redux/selectors/selectorStudents';
const FlatlistUI = (prop) => {
    const { data, chitiet, } = prop;
    const dispatch = useDispatch();
    const [state, setState] = useState({
        monHoc: data,
        ids: []
    })
    useEffect(() => {
        dispatch(getListMonHocSuccess(state.ids));
    }, [state.ids])

    const idsMonHoc = useSelector(getListMonHocSelectors);
    console.log(idsMonHoc);
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
                ...state,
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
                    checked={isChecked(item.mahp)}
                    onPress={() => toggleChecked(item.mahp)}
                />
                <View>
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
                </View>


            </View>
        </View>
    }
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
    txtRenderChonMH1: { color: 'black', fontWeight: "600", fontSize: 18 }
})
export default FlatlistUI