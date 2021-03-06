import {
  Alert,
  Keyboard,
  LogBox,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BackgroundView } from '../../../components';
import Text from '../../../components/Text';
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
      handleError('Y??u c???u nh???p mssv!', 'mssv');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Y??u c???u nh???p m???t kh???u!', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = async () => {
    await AsyncStorage.removeItem('@token');

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
      Alert.alert('Th??ng b??o', 'M?? s??? sinh vi??n ho???c m???t kh???u sai!');
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  /**
   * render view
   * ========================================================================
   */
  return (
    <BackgroundView>
      <Loader visible={loadingLogin || loadingGetProfile} />
      <View style={styles.inputView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}> C???NG TH??NG TIN SINH VI??N</Text>
          <Text style={styles.secondaryText}> ????NG NH???P H??? TH???NG</Text>
        </View>
        <Input
          onChangeText={(text) => handleOnchange(text, 'mssv')}
          onFocus={() => handleError(null, 'mssv')}
          iconName="email-outline"
          label="MSSV"
          placeholder="Nh???p mssv"
          error={errors.mssv}
          style={{ width: '86%', fontSize: 18, color: 'black' }}
        />
        <Input
          onChangeText={(text) => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          label="M???t kh???u"
          placeholder="Nh???p m???t kh???u"
          error={errors.password}
          password
          style={{ width: '80%', fontSize: 18, color: 'black' }}
        />
        <TouchableOpacity style={styles.btnStyle} onPress={validate}>
          <Text style={styles.textBtn}>????NG NH???P</Text>
        </TouchableOpacity>
      </View>
    </BackgroundView>
  );
};

export default SignInScreen;
