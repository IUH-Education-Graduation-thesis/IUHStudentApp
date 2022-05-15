import {
  LogBox,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { BackgroundView } from '../../../components';
import FlatlistUI from './components/FlatlistUI';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import LopHocPhan from './components/LopHocPhan';
import queries from '../../../core/GraphQl';
import { GETLOPHOCPHANFRAGMENT } from './fragment';
import { useMutation, useQuery } from '@apollo/client';
import Step3 from './components/Step3Render';
import { isEmpty } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';
import { COLORS } from '../../../themes/color';
import ModalLichHoc from './components/ModalLichHoc';
import ModalLichTrung from './components/ModalLichTrung';
import { fragmentLichTrung } from './fragment.LichTrung';

const getHocPhanForDKHP = queries.query.getListHocPhanDKHP(
  GETLOPHOCPHANFRAGMENT,
);
const dangKyHocPhanMutation = queries.mutation.dangKyHocPhan();
const checkLichTrungMutation = queries.mutation.checkLichTrung(fragmentLichTrung);
const ProgressStepsUI = ({ route }) => {
  const { currentHocKy } = route.params;

  const dataGia = {
    "data": {
      "checkLichTrung": {
        "status": "OK",
        "errors": null,
        "message": "Kiểm tram lịch trùng thành công.",
        "data": [
          {
            "isTrung": true,
            "listNgayTrongTuan": [
              {
                "thu": "Thứ 2",
                "thuNumber": 2,
                "lichHocs": [
                  {
                    "id": "1",
                    "ghiChu": null,
                    "ngayHocTrongTuan": 2,
                    "nhomThucHanh": null,
                    "thoiGianBatDau": "2021-07-01T00:00:00Z",
                    "thoiGianKetThuc": "2021-12-02T00:00:00Z",
                    "tietHocBatDau": 1,
                    "tietHocKetThuc": 3,
                    "isLyThuyet": true,
                    "isLichThi": false,
                    "giangVien": null
                  },
                  {
                    "id": "4",
                    "ghiChu": null,
                    "ngayHocTrongTuan": 2,
                    "nhomThucHanh": null,
                    "thoiGianBatDau": "2021-08-01T00:00:00Z",
                    "thoiGianKetThuc": "2022-01-02T00:00:00Z",
                    "tietHocBatDau": 1,
                    "tietHocKetThuc": 3,
                    "isLyThuyet": true,
                    "isLichThi": false,
                    "giangVien": null
                  }
                ]
              },
              {
                "thu": "Thứ 3",
                "thuNumber": 3,
                "lichHocs": [
                  {
                    "id": "2",
                    "ghiChu": null,
                    "ngayHocTrongTuan": 3,
                    "nhomThucHanh": 1,
                    "thoiGianBatDau": "2021-08-01T00:00:00Z",
                    "thoiGianKetThuc": "2021-08-01T00:00:00Z",
                    "tietHocBatDau": 1,
                    "tietHocKetThuc": 2,
                    "isLyThuyet": false,
                    "isLichThi": false,
                    "giangVien": null
                  },
                  {
                    "id": "5",
                    "ghiChu": null,
                    "ngayHocTrongTuan": 3,
                    "nhomThucHanh": 1,
                    "thoiGianBatDau": "2021-08-01T00:00:00Z",
                    "thoiGianKetThuc": "2021-11-14T00:00:00Z",
                    "tietHocBatDau": 1,
                    "tietHocKetThuc": 3,
                    "isLyThuyet": false,
                    "isLichThi": false,
                    "giangVien": null
                  }
                ]
              },
              {
                "thu": "Thứ 4",
                "thuNumber": 4,
                "lichHocs": []
              },
              {
                "thu": "Thứ 5",
                "thuNumber": 5,
                "lichHocs": []
              },
              {
                "thu": "Thứ 6",
                "thuNumber": 6,
                "lichHocs": []
              },
              {
                "thu": "Thứ 7",
                "thuNumber": 7,
                "lichHocs": []
              },
              {
                "thu": "Chủ nhật",
                "thuNumber": 8,
                "lichHocs": []
              }
            ]
          }
        ]
      }
    }
  }

  /**
   * API
   * ===========================================
   */

  const { data: dataGetHocPhanDangKy } = useQuery(getHocPhanForDKHP, {
    skip: !currentHocKy,
    variables: {
      hocKyNormalId: currentHocKy,
      kieu: 'HOC_MOI',
    },
  });

  const listHocPhanDangKy =
    dataGetHocPhanDangKy?.getListHocPhanDKHP?.data || [];

  /**
   * UseEffect
   * ==========================================
   */

  const [actDangKyHocPhan, { data: dataDangKyHocPhan }] = useMutation(
    dangKyHocPhanMutation,
  );
  const [actLichTrung, { data: dataLichTrung }] = useMutation(checkLichTrungMutation);
  /**
   *  const
   */
  const nav = useNavigation();
  const [currentActive, setCurrentActive] = useState(0);
  const [hocPhanSelected, setHocPhanSelected] = useState([]);
  const [lopHocPhanSelected, setLopHocPhanSelected] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [isVisibleModalThanhCong, setIsVisibleModalThanhCong] = useState(false);
  const [isVisibleModalLichTrung, setIsVisibleModalLichHoc] = useState(false);
  const [state, setState] = useState({
    isValid: false,
    errors: false
  });
  /**
   * UseEffect
   * ==========================================
   */
  const [lichTrung, setLichTrung] = useState([])
  const [idLopHP, setIdLopHP] = useState([
    {
      lopHocPhanId: "",
      nhomThucHanh: "",
    }
  ]);
  const [isTrung, setIsTrung] = useState(false);
  // console.log("lichTrung", JSON.stringify(idLopHP, null, 4));
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    lopHocPhanSelected.map(item => setIdLopHP([{ lopHocPhanId: item.id, nhomThucHanh: item?.lichHocs?.nhomThucHanh }]))
  }, [lopHocPhanSelected]);
  /**
   * function
   * ===========================================================================
   */
  const handleStep3Change = payload => {
    setDataSubmit(payload);
  };

  const handleLopHocPhanChange = payload => {
    setLopHocPhanSelected(payload);
  };

  const handleHocPhanChange = payload => {
    const _listHocPhanDangKy = listHocPhanDangKy?.filter(item =>
      payload?.includes(item?.id),
    );

    setHocPhanSelected(_listHocPhanDangKy);
  };

  const onNextStep = () => {
    if (!isEmpty(lopHocPhanSelected)) {
      setState({ errors: false })
      console.log('isSelected');
    } else {
      setState({ errors: true })
      Alert.alert(
        "Thông báo",
        "Yêu cầu chọn lớp học phần trước khi nhấn Tiếp tục",
        [
          { text: 'Ok', onPress: () => console.log('Ok Pressed') }
        ],
        { cancelable: false }
      )

    }
  };

  const onPaymentStepComplete = () => {
    if (!isEmpty(hocPhanSelected)) {

      setState({ errors: false })
      console.log('isSelected');
    } else {
      setState({ errors: true })
      Alert.alert(
        "Thông báo",
        "Yêu cầu chọn học phần trước khi nhấn Tiếp tục",
        [
          { text: 'Ok', onPress: () => console.log('Ok Pressed') }
        ],
        { cancelable: false }
      )
    }
  };

  const onPrevStep = () => {
    setCurrentActive(currentActive - 1);
  };

  const onSubmitSteps = async () => {
    const _inputs = dataSubmit;

    if (!isTrung) {
      setState({ errors: false })
      const _dataRes = await actDangKyHocPhan({
        variables: {
          inputs: _inputs,
        },
      });
      const _errors = _dataRes?.data?.dangKyHocPhan?.errors || [];

      if (!isEmpty(_errors)) {
        return;
      }

      const _data = _dataRes?.data?.dangKyHocPhan?.data || [];

      if (isEmpty(_data)) {
        return;
      }

      setIsVisibleModalThanhCong(true);
    } else {
      setState({ errors: true })
      Alert.alert(
        "Thông báo",
        "Trùng lịch học!",
        [
          { text: 'Ok', onPress: () => console.log('Ok Pressed') }
        ],
        { cancelable: false }
      )
    }



    // nav.navigate(screenName.dkhp);
  };
  const onPress = async () => {
    const _dataLichTrung = await actLichTrung({
      variables: {
        listLopHocPhanPrepareDangKy: dataSubmit,
        hocKyNormalId: currentHocKy
      }

    })
    console.log("_dataLichTrung", JSON.stringify(_dataLichTrung.data?.checkLichTrung?.data, null, 3));
    const _dataLT = _dataLichTrung.data?.checkLichTrung?.data;
    _dataLT.map(item => {
      setLichTrung(item.listNgayTrongTuan);
      setIsTrung(item.isTrung);
      setIsVisibleModalLichHoc(true);
    })
  }
  /**
   * render UI
   */
  return (
    <BackgroundView>
      <TouchableOpacity style={styles.goback} onPress={() => nav.goBack()}><Ionicons name='chevron-back-sharp' size={35} /></TouchableOpacity>
      <ProgressSteps
        labelColor="#393939"
        disabledStepIconColor="#757575"
        progressBarColor="#757575">
        <ProgressStep
          label="Học phần"
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          errors={state.errors}
          nextBtnText="Tiếp tục">
          <FlatlistUI
            onSelectChange={handleHocPhanChange}
            data={listHocPhanDangKy}
            chitiet={false}
            listHocPhan={hocPhanSelected}
          />
        </ProgressStep>
        <ProgressStep
          label="Lớp học phần"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText="Trở về"
          nextBtnText="Tiếp tục"
          errors={state.errors}
          previousBtnStyle={{ textAlign: 'center', padding: 8 }}>
          <LopHocPhan
            onChange={handleLopHocPhanChange}
            data={hocPhanSelected}
            listLopHP={lopHocPhanSelected}
          />
        </ProgressStep>
        <ProgressStep
          label="Chi tiết lớp học"
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          errors={state.errors}
          previousBtnText="Trở về">
          <TouchableOpacity onPress={() => onPress()} style={{ height: 40, fontSize: 20, width: 200, marginBottom: 3, marginLeft: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.blue }}>
            <Text style={{ color: 'black' }}>Kiểm tra lịch trùng</Text>
          </TouchableOpacity>
          <ModalLichTrung
            onClose={() => setIsVisibleModalLichHoc(false)}
            isVisible={isVisibleModalLichTrung}
            data={lichTrung}
            isTrung={isTrung}
          />
          <Step3 onChange={handleStep3Change} data={lopHocPhanSelected} />
        </ProgressStep>
      </ProgressSteps>
      <Modal isVisible={isVisibleModalThanhCong}>
        <View
          style={{
            flex: 0.2,
            backgroundColor: 'white',
            borderRadius: 10,
            overflow: 'hidden',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Đăng ký học phần thành công.
          </Text>
          <TouchableOpacity
            onPress={() => nav.navigate(screenName.dkhp)}
            style={{
              backgroundColor: '#B9F8D3',
              paddingHorizontal: 50,
              paddingVertical: 10,
              borderRadius: 5,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </BackgroundView>
  );
};
const styles = StyleSheet.create({
  goback: {
    position: 'absolute',
    paddingTop: 30,
    paddingLeft: 10
  },
  viewStep1: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtheader: { color: 'black', fontWeight: '600', fontSize: 18 },
  txtRenderChonMH: { color: 'black', fontWeight: '600', fontSize: 18 },
  item: {
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 16,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    height: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  subitem: {
    backgroundColor: 'lightblue',
    paddingBottom: 20,
    marginVertical: 8,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});
export default ProgressStepsUI;
