import { Keyboard, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackgroundView } from '../../../components'
import Text from '../../../components/Text'
import TextInput from '../../../components/TextInput'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../utils/constantScreenName'
import queries from '../../../core/GraphQl';
import { useMutation } from '@apollo/client'
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginMutation = queries.mutation.login(`token`);

const SignInScreen = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigation();
    /**
     * API
     * ================================================================
     */

    const [actLogin, { data: dataLogin, loading: loadingLogin }] = useMutation(loginMutation);

    /**
     * Useeffect
     * ==============================================================
     */


    /**
     * Function
     * ===================================================================
     */

    const handleOnPressLogin = async () => {
        const _data = await actLogin({
            variables: {
                user_name: userName,
                password: password,
            }
        })

        const _token = _data?.data?.login?.data?.token || '';


        if (isEmpty(_token)) {
            // do some thing here
            return;
        }

        try {
            await AsyncStorage.setItem('@token', _token)
            nav.navigate(screenName.homeTab)
        } catch (e) {
            console.log('e', e);
            // saving error
        }
    }

    /**
     * render view
     * ========================================================================
     */
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
                        onChangeText={(text) => setUserName(text)}
                        placeholder='Nhập mã sinh viên'
                        style={styles.placeholderText}
                    />
                    <TextInput
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        placeholder='Nhập mật khẩu'
                        style={styles.placeholderText} />
                </View>
                <View style={styles.btnView} >
                    <TouchableOpacity style={styles.btnStyle} onPress={handleOnPressLogin}>
                        <Text style={styles.textBtn}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
            </BackgroundView>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen