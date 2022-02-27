import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style'
import BackgroundView from '../../../components/BackgroundView'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../utils/constantScreenName'

import Button from './components/Button'
import IconBtn, { tpyeIcon } from './components/IconBtn'
const HomeScreen = () => {
    const name = "Đoàn Thị Thanh Hồng";
    const mssv = 18050761;
    const nav = useNavigation()
    const onPressBtn = (screenName) => {
        nav.navigate(screenName, { id: mssv })
    }
    return (
        <BackgroundView>
            <View style={{ flex: 0.6 }}>
                <View style={styles.headerView}>
                    <Text style={styles.textHeader}>Xin chào, {name}</Text>
                    <TouchableOpacity onPress={() => nav.navigate(screenName.announce)}>
                        <Ionicons name='notifications-outline' color="white" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.featureView} >
                    <Button nameIcon="calendar-check-o" size={30} color="#4a8cfa" textBtn="Xem lịch" onPress={() => onPressBtn(screenName.calendar)} />
                    <View style={{ backgroundColor: '#eae4e4', width: 1, height: 70 }} />
                    <Button nameIcon="vcard-o" size={30} color="#4a8cfa" textBtn="Xem điểm" onPress={() => onPressBtn(screenName.mark)} />
                </View>
            </View>
            <View style={styles.contentView} >
                <IconBtn nameIcon="stack" size={30} text={"Đăng ký học phần"} type={tpyeIcon.octicons} />
            </View>
        </BackgroundView>
    )
}
export default HomeScreen