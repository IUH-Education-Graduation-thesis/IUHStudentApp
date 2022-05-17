import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import BackgroundView from '../../../components/BackgroundView';
import DropDownHK from './components/DropDownHK';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Text from '../../../components/Text';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Accordion from 'react-native-collapsible/Accordion';
import { IC_ARR_DOWN } from '../MarkScreen/icons';
import queries from '../../../core/GraphQl';
import { GET_LIST_HOC_KY_FRAGMENT, GET_LOP_HOC_PHAN_DA_DANG_KY } from './fragment';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { isEmpty } from 'lodash';
import ModalLichHoc from '../ProgressStepsUI/components/ModalLichHoc';
import { fragmentHuyLHP } from './fragment.huyLHP';

const getListHocKyQuery = queries.query.getListHocKy(GET_LIST_HOC_KY_FRAGMENT);
const getLopHocPhanDaDangKy = queries.query.getLopHocPhanDaDangKy(GET_LOP_HOC_PHAN_DA_DANG_KY);
const huyDangKyHocPhanMutation = queries.mutation.huyLopHocPhan(fragmentHuyLHP);
const DangKyHPScreen = () => {
  const title = ['Tên môn học/học phần', 'Bắt buộc'];
  const nav = useNavigation();
  const [activeSections, setActiveSections] = useState([]);
  const [currentHocKy, setCurrentHocKy] = useState(null);
  const [currentLopHocPhan, setCurrentLopHocPhan] = useState({});
  const [isVisibleModalLicHoc, setIsVisibleModalLicHoc] = useState(false);
  const [dataForListLopHocPhanDaDangKy, setdataForListLopHocPhanDaDangKy] = useState([]);

  /**
   * query
   * =================================================================================================
   */
  const { data: dataGetListHocKy, loading: loadingGetListHocKy } = useQuery(getListHocKyQuery, {
    fetchPolicy: 'network-only',
    onCompleted: (dataRes) => {
      const _data = dataRes?.getListHocKy?.data || [];

      const _lastHocKy = _data?.[_data?.length - 1] || {};

      setCurrentHocKy(_lastHocKy);
    },
  });

  const [actHuyDKHP, { data: dataHuy }] = useMutation(huyDangKyHocPhanMutation);
  const [actGetHocPhanDaDangKy, { data: dataGetLopHocPhanDaDangKy }] =
    useLazyQuery(getLopHocPhanDaDangKy);

  const dataForDropdown = dataGetListHocKy?.getListHocKy?.data?.map((item) => ({
    value: item?.id,
    label: `Học kỳ ${item?.thuTuHocKy} (${item?.namHoc?.namBatDau}-${item?.namHoc?.namKetThuc})`,
  }));

  /**
   * useEffect
   * =============================================
   */
  useEffect(() => {
    const _data = dataGetLopHocPhanDaDangKy?.getLopHocPhanDaDangKy?.data;
    setdataForListLopHocPhanDaDangKy(_data);
  });

  /**
   * Function
   * ======================================================================================
   */
  //Show alert when user not pick hocKy
  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Thông báo',
      //body
      'Yêu cầu chọn học kỳ trước khi nhấn "DKHP"!',
      [{ text: 'Ok', onPress: () => console.log('Ok Pressed') }],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };
  const onPress = async () => {
    if (currentHocKy === null) {
      twoOptionAlertHandler();
    } else {
      nav.navigate(screenName.stepDKHP, {
        currentHocKy,
      });
    }
  };

  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(sections);
  };

  const handleWhenHocKyChange = (payload) => {
    setCurrentHocKy(payload);

    actGetHocPhanDaDangKy({
      variables: {
        hocKyId: payload,
      },
    });
  };

  const handlePressXemButton = (lopHocPhan) => {
    setIsVisibleModalLicHoc(true);
    setCurrentLopHocPhan(lopHocPhan);
  };

  /**
   * render view
   * ====================================================================================
   */
  const _renderHeader = (section) => {
    return (
      <View key={section?.id} style={styles.item}>
        <Text style={styles.title}>{section?.hocPhan?.monHoc?.ten}</Text>
        <View style={{ flexDirection: 'row' }}>
          {section?.hocPhan?.batBuoc ? (
            <AntDesign name="checkcircle" size={22} color={'green'} style={{ marginRight: 10 }} />
          ) : (
            <MaterialIcons name="cancel" size={25} color={'red'} style={{ marginRight: 10 }} />
          )}
          <Image source={IC_ARR_DOWN} />
        </View>
      </View>
    );
  };
  const handleHuyHocPhanButton = (item) => {
    Alert.alert(
      //title
      'Thông báo',
      //body
      'Bạn có muốn hủy lớp học phần?',
      [
        {
          text: 'Đồng ý',
          onPress: async () => {
            const dataHuyHP = await actHuyDKHP({
              variables: {
                lopHocPhanId: item.id,
              },
            });
            if (!isEmpty(dataHuyHP)) {
              const _data = dataGetLopHocPhanDaDangKy?.getLopHocPhanDaDangKy?.data;
              setdataForListLopHocPhanDaDangKy(_data);
            } else {
              Alert.alert(
                'Thông báo',
                'Hủy lớp học phần không thành công',
                [{ text: 'Ok', onPress: () => console.log('Cancel Pressed') }],
                { cancelable: true },
              );
            }
          },
        },
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };
  const _renderContent = (item) => {
    return (
      <View
        style={{
          borderTopColor: 'grey',
          borderTopWidth: 1,
          backgroundColor: 'white',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}
      >
        <View style={{ padding: 20 }}>
          <View>
            <Text>{`Mã LHP: ${item?.maLopHocPhan}`}</Text>
            <Text>{`Tên môn học: ${item?.tenLopHocPhan}`}</Text>
            <Text>{`Lớp dự kiên: ${item?.lopDuKien}`}</Text>
            <Text>{`Số tín chỉ: ${
              item?.hocPhan?.soTinChiLyThuyet + item?.hocPhan?.soTinChiThucHanh
            }`}</Text>
            <Text>{`Nhóm thực hành: ${item?.soNhomThucHanh}`}</Text>
            <Text>{`Trạng thái LHP: ${item?.trangThaiLopHocPhan}`}</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', marginTop: 20 }}>
            <TouchableOpacity onPress={() => handleHuyHocPhanButton(item)} style={styles.textHuy}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePressXemButton(item)} style={styles.textHuy}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Xem</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderListHocPhanDaDangKy = useMemo(() => {
    if (isEmpty(dataForListLopHocPhanDaDangKy)) return;

    return (
      <Accordion
        sections={dataForListLopHocPhanDaDangKy}
        keyExtractory={(item) => item?.id}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={setSections}
      />
    );
  }, [dataForListLopHocPhanDaDangKy, activeSections]);

  const renderDropdown = useMemo(() => {
    return (
      <DropDownHK
        currentHocKy={currentHocKy}
        onChange={handleWhenHocKyChange}
        data={dataForDropdown}
      />
    );
  }, [dataForDropdown, handleWhenHocKyChange]);

  return (
    <BackgroundView>
      <View style={{ flex: 0.2 }}>
        <View style={styles.headerView}>
          <Text style={styles.textHeader}>Đăng ký học phần</Text>
        </View>
        <View style={styles.viewStep1}>
          <TouchableOpacity style={styles.styleBtn} onPress={onPress}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>ĐKHP</Text>
          </TouchableOpacity>
          {renderDropdown}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.textMH}>Môn học đã đăng ký</Text>
        <Table borderStyle={{ borderWidth: 1 }}>
          <TableWrapper>
            <Row data={title} flexArr={[3, 1]} textStyle={styles.text} />
          </TableWrapper>
        </Table>
        <View style={{ flex: 3 }}>
          <ScrollView>{renderListHocPhanDaDangKy}</ScrollView>
        </View>
      </View>
      <ModalLichHoc
        onClose={() => setIsVisibleModalLicHoc(false)}
        data={currentLopHocPhan}
        isVisible={isVisibleModalLicHoc}
      />
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  styleBtn: {
    backgroundColor: '#1da1f2',
    borderRadius: 5,
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  headerView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#4baef9',
    marginBottom: 5,
  },
  viewStep1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtheader: { color: 'black', fontWeight: '600', fontSize: 18 },
  renderContent: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  textHuy: {
    alignItems: 'flex-end',
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: '45%',
    height: 40,
    width: 60,
    backgroundColor: '#1da1f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMH: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginBottom: 6,
    textAlign: 'center',
  },
  title: { flex: 1, alignItems: 'flex-start' },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  item: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
});
export default DangKyHPScreen;
