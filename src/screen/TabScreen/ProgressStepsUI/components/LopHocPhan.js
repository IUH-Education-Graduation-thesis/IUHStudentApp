import { Image, ScrollView, StyleSheet, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../../../../components/Text';
import { IC_ARR_DOWN } from '../../MarkScreen/icons';
import Accordion from 'react-native-collapsible/Accordion';
import { getListMonHocSelectors } from '../../../../redux/selectors/selectorStudents';
import { useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const LopHocPhan = (props) => {
    const { data } = props;
    // console.log(data);
    const idsMonHoc = useSelector(getListMonHocSelectors);
    const [state, setState] = useState({
        lopHocPhan: []
    });
    const [checked, setChecked] = useState(data[0].lopHocPhans.maLopHocPhan);
    const [activeSections, setActiveSections] = useState([]);
    useEffect(() => {
        if (idsMonHoc != null) {
            data.map((item, index) => {
                idsMonHoc.map(id => {
                    if (id === item.maHocPhan) {
                        setState({
                            lopHocPhan: [...state.lopHocPhan, item],
                        });
                    }
                })
            })
        }
    }, [data])

    const _renderHeader = section => {
        return (<View key={section.id} style={styles.item} >
            <Text style={styles.title}>{section.monHoc.ten}</Text>
            <Image source={IC_ARR_DOWN} />
        </View>)
    };
    const setSections = (sections) => {
        // Setting up a active section state
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };
    const _renderContent = item => {
        const { lopHocPhans } = item;
        return lopHocPhans.map((lhp) => {
            console.log("lopHocPhans", lhp.lichHocs.ngayHocTrongTuan);
            return (
                <View>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, marginHorizontal: 20, padding: 10, borderRadius: 10, }}>
                        <RadioButton
                            value={lhp.maLopHocPhan}
                            status={checked === lhp?.maLopHocPhan ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(lhp?.maLopHocPhan)}
                        />
                        <View>
                            <Text style={styles.txtRenderChonMH}>{lhp?.maLopHocPhan} - {item?.monHoc?.ten}</Text>
                            {/* <Text style={styles.txtRenderChonMH}>Tín chỉ: {lopHocPhans.lichHocs}</Text> */}
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={styles.txtRenderChonMH1}>Bắt buộc:</Text>
                                {
                                    item?.batBuoc ?
                                        <AntDesign name='checkcircle' size={25} color={"green"} style={{ marginLeft: 15 }} />
                                        :
                                        <MaterialIcons name='cancel' size={30} color={"red"} style={{ marginLeft: 15 }} />
                                }
                            </View>
                            <Text style={styles.txtRenderChonMH}>GV: {lhp?.giangViens[0]?.hoTenDem + " " + lhp?.giangViens[0]?.ten}</Text>
                            <Text style={styles.txtRenderChonMH}>Tiết: {lhp?.lichHocs[0]?.tietHocBatDau + " - " + lhp?.lichHocs[0]?.tietHocKetThuc}</Text>
                            <Text style={styles.txtRenderChonMH}>Thứ : {lhp?.lichHocs[0]?.ngayHocTrongTuan}</Text>
                            <Text style={styles.txtRenderChonMH}>Phòng học : {lhp?.lichHocs[0]?.phongHoc?.tenPhongHoc}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        )

    };

    return (
        <ScrollView>
            <Accordion
                sections={state.lopHocPhan}
                keyExtractory={(item, index) => index}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={setSections}
            />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: "lightblue",
        paddingBottom: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 32,
    },
    title: {
        fontSize: 20
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
    },
    contentView: {
        flex: 1.4,
    },
    textHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: "600"
    },
    subtitle1: {
        fontSize: 20,
        fontWeight: '500',
        height: 40,
        backgroundColor: '#bff006',
        marginBottom: 10,

    }
});

export default LopHocPhan