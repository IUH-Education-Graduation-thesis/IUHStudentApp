import { View, TouchableOpacity, LogBox } from 'react-native';
import React, { useContext, useEffect, useMemo } from 'react';
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
import { GlobalContext } from '../../../contexts/GlobalContext';

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
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { listNotification } = useContext(GlobalContext);

  const listNotificationUnRead = listNotification?.filter((item) => !item?.isRead);

  /**
   * API
   * ===============================================================
   */

  const { data: dataGetProfile, error: errorData } = useQuery(getProfileQuery, {
    onCompleted: (data) => {
      const _sv = data?.getProfile?.data[0]?.sinhVien;
      if (!isEmpty(_sv)) {
        dispatch(getSinhVienSuccess(_sv));
        return;
      }

      nav.navigate(screenName.signIn);
    },
  });
  // console.log("_sv", sv);

  const sv = dataGetProfile?.getProfile?.data[0]?.sinhVien || {};
  /**
   * Function
   * ===============================================
   */

  const onPressBtn = (screenName) => {
    nav.navigate(screenName);
  };

  /**
   * UseEffect
   * ======================================================
   */
  useEffect(() => {
    if (errorData) {
      nav.navigate(screenName.signIn);
    }
  }, [errorData]);

  return (
    <BackgroundView>
      <View style={{ flex: 0.6 }}>
        <View style={styles.headerView}>
          <Text style={styles.textHeader}>Xin chào, {sv?.hoTenDem + ' ' + sv?.ten}</Text>
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => nav.navigate(screenName.notification, { listNotification })}
          >
            <Ionicons name="notifications-outline" color="white" size={25} />
            <View
              style={{
                position: 'absolute',
                borderRadius: 50,
                backgroundColor: 'red',
                width: 10,
                height: 10,
                right: 0,
                display: listNotificationUnRead?.length <= 0 ? 'none' : 'flex',
              }}
            />
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
        <IconBtn
          onPress={() => nav.navigate(screenName.dkhp)}
          nameIcon="stack"
          size={30}
          text={'Đăng ký học phần'}
          type={tpyeIcon.octicons}
        />
        <View style={{ width: 20 }} />
        <IconBtn
          onPress={() => nav.navigate(screenName.chuongTrinhKhung)}
          nameIcon="project"
          size={30}
          text={'Chương trình khung'}
          type={tpyeIcon.octicons}
        />
      </View>
    </BackgroundView>
  );
};
export default HomeScreen;
