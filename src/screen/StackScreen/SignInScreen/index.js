import { Alert, Keyboard, KeyboardAvoidingView, LogBox, TouchableOpacity, View } from 'react-native';
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
import Loader from '../../../components/Loader';
import Input from '../../../components/Input';

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
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [inputs, setInputs] = useState({ mssv: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  /**
   * API
   * ================================================================
   */

  const [actLogin, { data: dataLogin, loading: loadingLogin, error }] = useMutation(loginMutation);

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
      if (isEmpty(dataGetProfile)) return;
      try {
        await AsyncStorage.removeItem('@token');
      } catch (e) { }
    };

    helloWorld();
  }, [dataGetProfile]);

  /**
   * Function
   * ===================================================================
   */

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.mssv) {
      handleError('Yêu cầu nhập mssv!', 'mssv');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Yêu cầu nhập mật khẩu!', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const _data = await actLogin({
        variables: {
          user_name: inputs.mssv,
          password: inputs.password,
        },
      });

      const _token = _data?.data?.login?.data?.token || '';
      const _sinhVien = _data?.data?.login?.data?.sinhVien || {};

      if (!isEmpty(_token)) {
        try {
          await AsyncStorage.setItem('@token', _token);
          dispatch(getSinhVienSuccess(_sinhVien));
          nav.navigate(screenName.homeTab);
        } catch (e) {
          console.log('e', e);
        }
      } else {
        Alert.alert('Thông báo', 'Mã số sinh viên hoặc mật khẩu sai!');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  /**
   * render view
   * ========================================================================
   */
  return (
    <BackgroundView>
      <Loader visible={loading} />
      <View style={styles.inputView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}> CỔNG THÔNG TIN SINH VIÊN</Text>
          <Text style={styles.secondaryText}> ĐĂNG NHẬP HỆ THỐNG</Text>
        </View>
        <Input
          onChangeText={text => handleOnchange(text, 'mssv')}
          onFocus={() => handleError(null, 'mssv')}
          iconName="email-outline"
          label="MSSV"
          placeholder="Nhập mssv"
          error={errors.mssv}
          style={{ width: '86%', fontSize: 18 }}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          error={errors.password}
          password
          style={{ width: '80%', fontSize: 18 }}
        />
        <TouchableOpacity style={styles.btnStyle} onPress={validate}>
          <Text style={styles.textBtn}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </BackgroundView>
  );
};

export default SignInScreen;
