import { Keyboard, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackgroundView } from '../../../components'
import Text from '../../../components/Text'
import TextInput from '../../../components/TextInput'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../utils/constantScreenName'
const SignInScreen = () => {
    const nav = useNavigation();
    return (
        <KeyboardAvoidingView behavior="height"
            style={styles.container}>
            <BackgroundView>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}> CỔNG THÔNG TIN SINH VIÊN</Text>
                    <Text style={styles.secondaryText}> ĐĂNG NHẬP HỆ THỐNG</Text>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        placeholder='Nhập mã sinh viên'
                        style={styles.placeholderText}
                    />
                    <TextInput
                        placeholder='Nhập mật khẩu'
                        style={styles.placeholderText} />
                </View>
                <View style={styles.btnView} >
                    <TouchableOpacity style={styles.btnStyle} onPress={() => nav.navigate(screenName.homeTab)}>
                        <Text style={styles.textBtn}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
            </BackgroundView>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen