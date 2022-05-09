import { Keyboard, KeyboardAvoidingView, LogBox, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BackgroundView } from '../../../components';
import Text from '../../../components/Text';
import TextInput from '../../../components/TextInput';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import queries from '../../../core/GraphQl';
import { useMutation, useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_FRAGMENT } from './fragment';
import { useDispatch } from 'react-redux';
import { getSinhVienSuccess } from '../../../redux/actions/studentActions';

const loginMutation = queries.mutation.login(LOGIN_FRAGMENT);
const getProfileQuery = queries.query.getProfile(`id
userName
roles
sinhVien {
  id
  hoTenDem
  ten
  lop{
    id
    ten
    khoa{
      id
      khoa
      hocKies{
        id
        thuTu
      }
    }
  }
}`);

const SignInScreen = () => {
  LogBox.ignoreAllLogs();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const nav = useNavigation();
  /**
   * API
   * ================================================================
   */

  const [actLogin, { data: dataLogin, loading: loadingLogin }] = useMutation(loginMutation);

  const {
    data: dataGetProfile,
    loading: loadingGetProfile,
    error: errorGetProfile,
  } = useQuery(getProfileQuery);

  /**
   * Useeffect
   * ==============================================================
   */

  useEffect(() => {
    const helloWorld = async () => {
      if (isEmpty(errorGetProfile)) return;
      try {
        await AsyncStorage.removeItem('@token');
      } catch (e) {
        console.log('e', e);
      }
    };

    helloWorld();
  }, [errorGetProfile]);

  /**
   * Function
   * ===================================================================
   */

  const handleOnPressLogin = async () => {
    const _data = await actLogin({
      variables: {
        user_name: userName,
        password: password,
      },
    });

    const _token = _data?.data?.login?.data?.token || '';
    const _sinhVien = _data?.data?.login?.data?.sinhVien || {};

    if (isEmpty(_token)) {
      return;
    }

    try {
      await AsyncStorage.setItem('@token', _token);
      dispatch(getSinhVienSuccess(_sinhVien));
      nav.navigate(screenName.homeTab);
    } catch (e) {
      console.log('e', e);
    }
  };

  /**
   * render view
   * ========================================================================
   */
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {!isEmpty(dataGetProfile?.getProfile.data) ? (
        nav.navigate(screenName.homeTab)
      ) : (
        <BackgroundView>
          <View style={styles.headerView}>
            <Text style={styles.headerText}> CỔNG THÔNG TIN SINH VIÊN</Text>
            <Text style={styles.secondaryText}> ĐĂNG NHẬP HỆ THỐNG</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={(text) => setUserName(text)}
              placeholder="Nhập mã sinh viên"
              style={styles.placeholderText}
            />
            <TextInput
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholder="Nhập mật khẩu"
              style={styles.placeholderText}
            />
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.btnStyle} onPress={handleOnPressLogin}>
              <Text style={styles.textBtn}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          </View>
        </BackgroundView>
      )}
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
