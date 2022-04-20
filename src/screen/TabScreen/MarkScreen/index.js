import React, { createRef, useEffect, useRef, useState } from "react";
import {
    StyleSheet,

    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Modal,
    Dimensions
} from "react-native";
import { IC_ARR_DOWN, IC_ARR_UP } from "./icons"
import Accordion from "react-native-collapsible/Accordion";
import BackgroundView from "../../../components/BackgroundView";
import BottomPopup from "./components/BottomPopup";
import Text from "../../../components/Text";
import Antdesign from 'react-native-vector-icons/AntDesign'
import queries from '../../../core/GraphQl';
import { GETDIEM_FRAGMENT } from "./fragment";
import { useQuery } from "@apollo/client";
import { COLORS } from "../../../themes/color";
import CTDiem from "./components/CTDiem";

const getDiemQuery = queries.query.getDiem(GETDIEM_FRAGMENT);
const sample = [
    {
        title: "HK1(2018-2019)",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "HK2(2018-2019)",
        data: ["French Fries", "Onion Rings", "Fried Shrimps", "Apple", "Banana"]
    },
    {
        title: "HK3(2018-2019)",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "HK1(2019-2020)",
        data: ["Cheese Cake", "Ice Cream"]
    }
];

const MarkScreen = (props) => {
    const popRef = createRef()
    const sheetRef = useRef();
    const [state, setState] = useState({
        activeSections: [],
        diem: []
    });
    const [currentDiem, setCurrentDiem] = useState()
    const [isShow, setShow] = useState(false);

    const show = () => {
        setShow(true);
    }
    const close = () => {
        setShow(false);
    }
    const [activeSections, setActiveSections] = useState([]);
    const { data: dataGetDiem, loading: loadingGetDiem, error: errorGetDiem } = useQuery(getDiemQuery);
    useEffect(() => {
        setState({ diem: dataGetDiem?.getDiem?.data });
    }, [dataGetDiem])

    const _renderHeader = section => (
        <View key={section} style={styles.item} >
            <Text style={styles.title}>HK{section.thuTuHocKy}({section.namBatDau + "-" + section.namKetThuc})</Text>
            <Image source={IC_ARR_DOWN} />
        </View>
    );

    const _renderContent = section => {
        return section.listSinhVienLopHocPhan.map((item, index) => {
            return (
                <>
                    <TouchableWithoutFeedback key={index} onPress={() => onShowUp(item)} style={styles.subitem}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <Text style={[styles.subtitle1]}>{index + 1 + "   " + item?.lopHocPhan?.tenLopHocPhan}</Text>
                            <Text style={styles.subtitle1}>{item.diemCuoiKy}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </>
            );

        });
    };
    const onShowUp = (item) => {
        show()
        setCurrentDiem(item);
    }
    const onClosePopup = () => {
        close()
    }
    const _updateSections = activeSections => {
        setActiveSections(
            activeSections.includes(undefined) ? [] : activeSections
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundView>
                <View style={styles.headerView}>
                    <Text style={styles.textHeader}>Kết quả học tập</Text>
                </View>
                <ScrollView>
                    {dataGetDiem !== null ? <Accordion
                        sections={state.diem}
                        keyExtractory={(item, index) => index}
                        activeSections={activeSections}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={_updateSections}
                    /> : <View />}
                </ScrollView>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={isShow}
                >
                    <View style={styles.styleView}>
                        <View style={styles.styleBottom}>
                            <View>
                                <View style={styles.viewheaderBottom}>
                                    <Text style={styles.textHeaderBottom}>{currentDiem?.lopHocPhan?.tenLopHocPhan}</Text>
                                    <TouchableOpacity onPress={onClosePopup}>
                                        <Antdesign name="closecircleo" size={25} color='black' />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 1, backgroundColor: 'gray' }} />
                                <CTDiem ten='Điểm thường kỳ' diem={currentDiem?.diemThuongKy} />
                                <CTDiem ten='Điểm giữa kỳ' diem={currentDiem?.diemGiuaKy} />
                                <CTDiem ten='Điểm thực hành' diem={currentDiem?.diemCuoiKy} />
                                <CTDiem ten='Điểm cuối kỳ' diem={currentDiem?.diemCuoiKy} />
                                <View style={{ height: 1, backgroundColor: 'gray' }} />
                                <CTDiem ten='Điểm trung bình' style={{ fontSize: 15, fontWeight: '700' }} />
                                <CTDiem ten='Ghi chú' style={{ fontSize: 15, fontWeight: '700' }} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </BackgroundView>
        </SafeAreaView>
    );
};
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewheaderBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    textHeaderBottom: {
        fontSize: 18,
        fontWeight: '900',
        height: 50,
        paddingTop: 10,
        textAlign: 'center'
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
        // backgroundColor: "lightblue",
        paddingBottom: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',

    }, styleView: {
        flex: 1,
        // backgroundColor: "#000000AA",
        justifyContent: "flex-end",
        alignItems: 'flex-end'
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
        height: 30,
        // backgroundColor: COLORS.lightBlue,
        marginBottom: 10,
        // borderWidth: 1
    }, styleBottom: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 3,
        // alignItems: 'center',
    },
});

export default MarkScreen