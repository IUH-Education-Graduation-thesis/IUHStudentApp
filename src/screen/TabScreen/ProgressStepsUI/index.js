import { Image, LogBox, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { BackgroundView } from '../../../components';
import FlatlistUI from './components/FlatlistUI';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import { useSelector } from 'react-redux';
import { getListMonHocSelectors } from '../../../redux/selectors/selectorStudents';
import LopHocPhan from './components/LopHocPhan';
const ProgressStepsUI = () => {

    /**
     *  const
     */
    const nav = useNavigation();
    const [currentActive, setCurrentActive] = useState(0)
    const idsMonHoc = useSelector(getListMonHocSelectors);
    const [state, setState] = useState({
        activeSections: [],
        monHoc: [{
            mahp: 410000161,
            tenMon: "Chung chi Toeic",
            tinChi: 5,
            batbuoc: true,
        },
        {
            tenMon: "Pháp luật đại cương",
            tinChi: 2,
            batbuoc: false,
            mahp: 410000191,
        },
        {
            tenMon: "Quản trị kinh doanh va kinh doanh quooc te",
            tinChi: 3,
            batbuoc: true,
            mahp: 410000124,
        }],
        ctLop: [{
            tenMon: "Pháp luật đại cương",
            tinChi: 3,
            batbuoc: false,
            mahp: 410000124561,
            tenGV: "Nguyễn Quỳnh Mai",
            tiet: "1-3",
            thu: "Thứ 5",
            lopDuKien: "DHKTPM14BTT"
        }
            , {
            tenMon: "Cơ sở văn hóa",
            tinChi: 3,
            batbuoc: false,
            mahp: 410000124238,
            tenGV: "Nguyễn Quỳnh Mai",
            tiet: "4-6",
            thu: "Thứ 5",
            lopDuKien: "DHKTPM14BTT"
        }
            , {
            tenMon: "Toán cao cấp",
            tinChi: 3,
            batbuoc: false,
            mahp: 410000124001,
            tenGV: "Nguyễn Quỳnh Mai",
            tiet: "4-6",
            thu: "Thứ 5", lopDuKien: "DHKTPM14BTT"
        }],
        chonLop: [{
            tenMon: "Pháp luật đại cương",
            tinChi: 3,
            batbuoc: false,
            mahp: 410000124561,
            tenGV: "Nguyễn Quỳnh Mai",
            tiet: "1-3",
            thu: "Thứ 5"
        }]
    });
    console.log("idsMonHoc", idsMonHoc);
    /**
    * UseEffect
    * ==========================================
    */
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    /**
     * function
     */
    const onNextStep = () => {
        console.log("idsMonHoc", idsMonHoc);
    };

    const onPaymentStepComplete = () => {
        console.log('Payment step completed!');
    };

    const onPrevStep = () => {
        setCurrentActive(currentActive - 1)
    };

    const onSubmitSteps = () => {
        console.log('called on submit step.');
        nav.navigate(screenName.dkhp)
    };


    /**
     * render UI
     */
    return (
        <BackgroundView>

            <ProgressSteps
                labelColor="#393939"
                disabledStepIconColor="#757575"
                progressBarColor="#757575"
            >
                <ProgressStep
                    label="Học phần"
                    onNext={onPaymentStepComplete()}
                    onPrevious={onPrevStep}
                    nextBtnText="Tiếp tục"
                >
                    <FlatlistUI data={state.monHoc} chitiet={false} />
                </ProgressStep>
                <ProgressStep
                    label="Lớp học phần"
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    previousBtnText="Trở về"
                    nextBtnText="Tiếp tục"
                    previousBtnStyle={{ textAlign: 'center', padding: 8 }}
                >
                    <LopHocPhan data={state.ctLop} />
                </ProgressStep>
                <ProgressStep
                    label="Chi tiết lớp học"
                    onPrevious={onPrevStep}
                    onSubmit={onSubmitSteps}
                    previousBtnText="Trở về"
                >
                    <FlatlistUI
                        data={state.chonLop}
                        chitiet={true}
                    />
                </ProgressStep>
            </ProgressSteps>
        </BackgroundView>
    )
}
const styles = StyleSheet.create({
    viewStep1: { flexDirection: 'row', marginVertical: 10, height: 30, justifyContent: 'space-around', alignItems: "center" },
    txtheader: { color: 'black', fontWeight: "600", fontSize: 18 },
    txtRenderChonMH: { color: 'black', fontWeight: "600", fontSize: 18 },
    item: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 20
    }, title: {
        fontSize: 16
    },
    subtitle1: {
        fontSize: 16,
        fontWeight: '500',
        height: 20,
        marginBottom: 10,
        alignItems: 'center',
    }, subitem: {
        backgroundColor: "lightblue",
        paddingBottom: 20,
        marginVertical: 8,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
})
export default ProgressStepsUI