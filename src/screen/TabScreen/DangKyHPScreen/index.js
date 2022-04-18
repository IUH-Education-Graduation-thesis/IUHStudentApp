import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import BackgroundView from '../../../components/BackgroundView';
import DropDownHK from './components/DropDownHK';
import {useNavigation} from '@react-navigation/native';
import {screenName} from '../../../utils/constantScreenName';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import Text from '../../../components/Text';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GETLOPHOCPHANFRAGMENT} from '../ProgressStepsUI/fragment';
import {useSelector} from 'react-redux';
import {gethocKyIDSelectors} from '../../../redux/selectors/selectorStudents';
import Accordion from 'react-native-collapsible/Accordion';
import {IC_ARR_DOWN} from '../MarkScreen/icons';
import queries from '../../../core/GraphQl';
import {
  GET_LIST_HOC_KY_FRAGMENT,
  GET_LOP_HOC_PHAN_DA_DANG_KY,
} from './fragment';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isEmpty} from 'lodash';
const getListHocPhanDKHPQuery = queries.query.getListHocPhanDKHP(
  GETLOPHOCPHANFRAGMENT,
);

const getListHocKyQuery = queries.query.getListHocKy(GET_LIST_HOC_KY_FRAGMENT);
const getLopHocPhanDaDangKy = queries.query.getLopHocPhanDaDangKy(
  GET_LOP_HOC_PHAN_DA_DANG_KY,
);

const DangKyHPScreen = () => {
  const title = ['Tên môn học/học phần', 'Bắt buộc'];
  const nav = useNavigation();
  const [activeSections, setActiveSections] = useState([]);
  const [getLopHocPhan, setDataGetHocKy] = useState([]);
  const [currentHocKy, setCurrentHocKy] = useState(null);
  const hocKyThuTu = useSelector(gethocKyIDSelectors);
  const [state, setState] = useState([
    {
      id: '1',
      maHocPhan: '40023100131',
      batBuoc: false,
      monHoc: {
        ten: 'Phương pháp tính',
      },
      lopHocPhans: [
        {
          id: '2',
          maLopHocPhan: '400231000212',
          tenLopHocPhan: 'DHKTPM14BTT',
          soLuongToiDa: 60,
          soNhomThucHanh: 1,
          trangThaiLopHocPhan: 'Chờ sinh viên đăng ký',
          soLuongHienTai: 0,
          lopDuKien: null,
          giangViens: [
            {
              hoTenDem: 'Hoang',
              ten: 'Anh',
            },
          ],
          lichHocs: [
            {
              id: '3',
              ngayHocTrongTuan: 3,
              nhomThucHanh: 0,
              thoiGianBatDau: '2021-12-31T00:00:00Z',
              thoiGianKetThuc: '2022-04-15T00:00:00Z',
              tietHocBatDau: 1,
              tietHocKetThuc: 3,
              phongHoc: {
                tenPhongHoc: 'B3.06',
              },
              isLyThuyet: false,
            },
          ],
        },
        {
          id: '6',
          maLopHocPhan: '400213000453',
          tenLopHocPhan: 'DHKTPM14ATT',
          soLuongToiDa: 40,
          soNhomThucHanh: 2,
          trangThaiLopHocPhan: 'Chờ sinh viên đăng ký',
          soLuongHienTai: 0,
          lopDuKien: null,
          giangViens: [
            {
              hoTenDem: 'Nguyen',
              ten: 'Hoang',
            },
          ],
          lichHocs: [
            {
              id: '4',
              ngayHocTrongTuan: 6,
              nhomThucHanh: 2,
              thoiGianBatDau: '2021-12-31T00:00:00Z',
              thoiGianKetThuc: '2022-04-15T00:00:00Z',
              tietHocBatDau: 4,
              tietHocKetThuc: 6,
              phongHoc: {
                tenPhongHoc: 'B2.03',
              },
              isLyThuyet: false,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      maHocPhan: '400243001500',
      batBuoc: true,
      monHoc: {
        ten: 'Tiếng anh 2',
      },
      lopHocPhans: [
        {
          id: '4',
          maLopHocPhan: '400213000452',
          tenLopHocPhan: 'DHKTPM14CTT',
          soLuongToiDa: 80,
          soNhomThucHanh: 2,
          trangThaiLopHocPhan: 'Chờ sinh viên đăng ký',
          soLuongHienTai: 0,
          lopDuKien: null,
          giangViens: [
            {
              hoTenDem: 'Nguyen',
              ten: 'Hoang',
            },
          ],
          lichHocs: [
            {
              id: '2',
              ngayHocTrongTuan: 2,
              nhomThucHanh: 0,
              thoiGianBatDau: '2021-12-31T00:00:00Z',
              thoiGianKetThuc: '2022-04-15T00:00:00Z',
              tietHocBatDau: 1,
              tietHocKetThuc: 3,
              phongHoc: {
                tenPhongHoc: 'A1.01',
              },
              isLyThuyet: false,
            },
          ],
        },
      ],
    },
  ]);

  /**
   * query
   * =================================================================================================
   */
  const {data: dataGetListHocKy, loading: loadingGetListHocKy} =
    useQuery(getListHocKyQuery);

  const dataForDropdown = dataGetListHocKy?.getListHocKy?.data?.map(item => ({
    value: item?.id,
    label: `Học kỳ ${item?.thuTuHocKy} (${item?.namHoc?.namBatDau}-${item?.namHoc?.namKetThuc})`,
  }));

  const {
    data: dataGetLopHocPhanDaDangKy,
    refetch: refetchGetLopHocPhanDaDangKy,
  } = useQuery(getLopHocPhanDaDangKy, {
    variables: {
      hocKyId: currentHocKy,
    },
  });

  const dataForListLopHocPhanDaDangKy =
    dataGetLopHocPhanDaDangKy?.getLopHocPhanDaDangKy?.data;

  const [
    actGetLopHocPhan,
    {
      data: dataGetLopHocPhan,
      loading: loadingGetLopHocPhan,
      error: errorGetLopHocPhan,
    },
  ] = useLazyQuery(getListHocPhanDKHPQuery);

  /**
   * useEffect
   * =============================================
   */

  useEffect(() => {
    setDataGetHocKy(dataGetLopHocPhan);
  }, [dataGetLopHocPhan]);

  /**
   * Function
   * ======================================================================================
   */
  const onPress = () => {
    actGetLopHocPhan({
      variables: {
        hocKyDangKy: parseInt(hocKyThuTu),
        // kieu: "HOC_MOI",
      },
    });

    nav.navigate(screenName.stepDKHP);
  };

  const setSections = sections => {
    console.log('sections', sections);
    // Setting up a active section state
    setActiveSections(sections);
  };

  const handleWhenHocKyChange = payload => {
    refetchGetLopHocPhanDaDangKy({
      hocKyId: payload,
    });
  };

  /**
   * render view
   * ====================================================================================
   */
  const _renderHeader = section => {
    console.log('section', section);
    return (
      <View key={section?.id} style={styles.item}>
        <Text style={styles.title}>{section?.hocPhan?.monHoc?.ten}</Text>
        <View style={{flexDirection: 'row'}}>
          {section?.hocPhan?.batBuoc ? (
            <AntDesign
              name="checkcircle"
              size={22}
              color={'green'}
              style={{marginRight: 10}}
            />
          ) : (
            <MaterialIcons
              name="cancel"
              size={25}
              color={'red'}
              style={{marginRight: 10}}
            />
          )}
          <Image source={IC_ARR_DOWN} />
        </View>
      </View>
    );
  };

  const _renderContent = item => {
    console.log(item);

    const {lopHocPhans} = item;
    return (
      <View>
        <View>
          {/* <View style={styles.renderContent}>
            <Text style={styles.txtRenderChonMH}>
              {lopHocPhans[0]?.maLopHocPhan} - {item?.monHoc?.ten}
            </Text>
            <Text style={styles.txtRenderChonMH}>
              Tín chỉ: {lopHocPhans.lichHocs}
            </Text>

            <Text style={styles.txtRenderChonMH}>
              GV:{' '}
              {lopHocPhans[0]?.giangViens[0]?.hoTenDem +
                ' ' +
                lopHocPhans[0]?.giangViens[0]?.ten}
            </Text>
            <Text style={styles.txtRenderChonMH}>
              Tiết:{' '}
              {lopHocPhans[0]?.lichHocs[0]?.tietHocBatDau +
                ' - ' +
                lopHocPhans[0]?.lichHocs[0]?.tietHocKetThuc}
            </Text>

            <Text style={styles.txtRenderChonMH}>
              Thứ : {lopHocPhans[0]?.lichHocs[0]?.ngayHocTrongTuan}
            </Text>
            <Text style={styles.txtRenderChonMH}>
              Phòng học : {lopHocPhans[0]?.lichHocs[0]?.phongHoc?.tenPhongHoc}
            </Text>
          </View> */}
          <TouchableOpacity style={styles.textHuy}>
            <Text style={{textAlign: 'center', color: 'white'}}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderListHocPhanDaDangKy = useMemo(() => {
    if (isEmpty(dataForListLopHocPhanDaDangKy)) return;

    return (
      <Accordion
        sections={dataForListLopHocPhanDaDangKy}
        keyExtractory={item => item?.id}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={setSections}
      />
    );
  }, [dataForListLopHocPhanDaDangKy, activeSections]);

  return (
    <BackgroundView>
      <View style={{flex: 0.2}}>
        <View style={styles.headerView}>
          <Text style={styles.textHeader}>Đăng ký học phần</Text>
        </View>
        <View style={styles.viewStep1}>
          <TouchableOpacity style={styles.styleBtn} onPress={onPress}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
              ĐKHP
            </Text>
          </TouchableOpacity>
          <DropDownHK onChange={handleWhenHocKyChange} data={dataForDropdown} />
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.textMH}>Môn học đã đăng ký</Text>
        <Table borderStyle={{borderWidth: 1}}>
          <TableWrapper>
            <Row data={title} flexArr={[3, 1]} textStyle={styles.text} />
          </TableWrapper>
        </Table>
        <View style={{flex: 3}}>
          <ScrollView>{renderListHocPhanDaDangKy}</ScrollView>
        </View>
      </View>
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
  txtheader: {color: 'black', fontWeight: '600', fontSize: 18},
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
  title: {flex: 1, alignItems: 'flex-start'},
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
