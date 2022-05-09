import { View, TouchableOpacity, LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './style';
import BackgroundView from '../../../components/BackgroundView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';

import Button from './components/Button';
import IconBtn, { tpyeIcon } from './components/IconBtn';
import Text from '../../../components/Text';
import { useQuery } from '@apollo/client';
import queries from '../../../core/GraphQl';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { getSinhVienSuccess } from '../../../redux/actions/studentActions';

const getProfileQuery = queries.query.getProfile(` id
userName
roles
sinhVien {
  id
  hoTenDem
  ten
  soDienThoai
  trangThai
  ngaySinh
  maSinhVien
  diaChi
  noiSinh
  bacDaoTao
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
const HomeScreen = () => {
  LogBox.ignoreAllLogs();
  const {
    data: dataGetProfile,
    loading: loadingGetProfile,
    error: errorGetProfile,
  } = useQuery(getProfileQuery);

  const dispatch = useDispatch();
  const nav = useNavigation();
  const onPressBtn = (screenName) => {
    nav.navigate(screenName, { id: mssv });
  };
  const sv = dataGetProfile?.getProfile?.data[0]?.sinhVien || [];

  useEffect(() => {
    if (sv) {
      dispatch(getSinhVienSuccess(sv));

      return;
    }

    nav.navigate(screenName.signIn);
  }, [sv]);

  return (
    <BackgroundView>
      <View style={{ flex: 0.6 }}>
        <View style={styles.headerView}>
          <Text style={styles.textHeader}>Xin chào, {sv?.hoTenDem + ' ' + sv?.ten}</Text>
          <TouchableOpacity onPress={() => nav.navigate(screenName.announce)}>
            <Ionicons name="notifications-outline" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.featureView}>
          <Button
            nameIcon="calendar-check-o"
            size={30}
            color="#4a8cfa"
            textBtn="Xem lịch"
            onPress={() => onPressBtn(screenName.calendar)}
          />
          <View style={{ backgroundColor: '#eae4e4', width: 1, height: 70 }} />
          <Button
            nameIcon="vcard-o"
            size={30}
            color="#4a8cfa"
            textBtn="Xem điểm"
            onPress={() => onPressBtn(screenName.mark)}
          />
        </View>
      </View>
      <View style={styles.contentView}>
        <IconBtn nameIcon="stack" size={30} text={'Đăng ký học phần'} type={tpyeIcon.octicons} />
      </View>
    </BackgroundView>
  );
};
export default HomeScreen;
