import { LogBox, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { BackgroundView } from '../../../components';
import FlatlistUI from './components/FlatlistUI';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import LopHocPhan from './components/LopHocPhan';
import queries from '../../../core/GraphQl';
import { DKHP_FRAGMENT, GETLOPHOCPHANFRAGMENT } from './fragment';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Step3 from './components/Step3Render';
import { isEmpty } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../themes/color';
import ModalLichHoc from './components/ModalLichHoc';
import ModalLichTrung from './components/ModalLichTrung';
import { fragmentLichTrung } from './fragment.LichTrung';
import Loader from '../../../components/Loader';
import ModalSuccess from './ModalSuccess';

const getHocPhanForDKHP = queries.query.getListHocPhanDKHP(GETLOPHOCPHANFRAGMENT);
const dangKyHocPhanMutation = queries.mutation.dangKyHocPhan(DKHP_FRAGMENT);
const checkLichTrungMutation = queries.mutation.checkLichTrung(fragmentLichTrung);
const ProgressStepsUI = ({ route }) => {
  const { currentHocKy } = route.params;

  /**
   * API
   * ===========================================
   */

  const [actGetHocPhanDangKy, { data: dataGetHocPhanDangKy, loading: loadingGetHocPhanDangKy }] =
    useLazyQuery(getHocPhanForDKHP);

  const [actDangKyHocPhan, { loading: loadingDangKyHocPhan }] = useMutation(dangKyHocPhanMutation);

  const [actLichTrung, { data: dataLichTrung, loading: loadingLichTrung }] =
    useMutation(checkLichTrungMutation);

  const listHocPhanDangKy = dataGetHocPhanDangKy?.getListHocPhanDKHP?.data || [];

  /**
   * UseEffect
   * ==========================================
   */

  /**
   *  const
   */
  const nav = useNavigation();
  const [currentActive, setCurrentActive] = useState(0);
  const [hocPhanSelected, setHocPhanSelected] = useState([]);
  const [lopHocPhanSelected, setLopHocPhanSelected] = useState([]);
  const [isVisibleModalThanhCong, setIsVisibleModalThanhCong] = useState(false);
  const [isVisibleModalLichTrung, setIsVisibleModalLichHoc] = useState(false);
  const [listLichTrung, setListLichTrung] = useState([]);
  const [dataDKHPResponse, setDataDKHPResponse] = useState({});

  const [state, setState] = useState({
    isValid: false,
    errors: false,
  });

  const lopHocPhanSelectedFormat = lopHocPhanSelected?.map((item) => {
    if (item?.nhomThucHanhChoose === null || item?.nhomThucHanhChoose === undefined) {
      const _nhomThucHanh = item?.lichHocs?.filter((_item) => !_item?.isLyThuyet)?.[0]
        ?.nhomThucHanh;

      return {
        ...item,
        nhomThucHanhChoose: _nhomThucHanh,
      };
    }

    return {
      ...item,
    };
  });

  /**
   * UseEffect
   * ==========================================
   */

  const [isTrung, setIsTrung] = useState(false);

  useEffect(() => {
    if (currentHocKy === null || currentHocKy === undefined) return;

    actGetHocPhanDangKy({
      variables: {
        hocKyNormalId: currentHocKy,
        kieu: 'HOC_MOI',
      },
    });
  }, [currentHocKy]);

  /**
   * function
   * ===========================================================================
   */
  const handleCloseModalSuccess = () => {
    setIsVisibleModalThanhCong(false);

    nav.navigate(screenName.dkhp);
  };

  const handleStep3Change = (payload) => {
    setLopHocPhanSelected(payload);
  };

  const handleLopHocPhanChange = (payload) => {
    setLopHocPhanSelected(payload);
  };

  const handleHocPhanChange = (payload) => {
    const _listHocPhanDangKy = listHocPhanDangKy?.filter((item) => payload?.includes(item?.id));

    setHocPhanSelected(_listHocPhanDangKy);
  };

  const onNextStep = () => {
    if (!isEmpty(lopHocPhanSelected)) {
      setState({ errors: false });
    } else {
      setState({ errors: true });
      Alert.alert(
        'Thông báo',
        'Yêu cầu chọn lớp học phần trước khi nhấn Tiếp tục',
        [{ text: 'Ok', onPress: () => console.log('Ok Pressed') }],
        { cancelable: false },
      );
    }
  };

  const onPaymentStepComplete = () => {
    if (!isEmpty(hocPhanSelected)) {
      setState({ errors: false });
    } else {
      setState({ errors: true });
      Alert.alert(
        'Thông báo',
        'Yêu cầu chọn học phần trước khi nhấn Tiếp tục',
        [{ text: 'Ok', onPress: () => console.log('Ok Pressed') }],
        { cancelable: false },
      );
    }
  };

  const onPrevStep = () => {
    setCurrentActive(currentActive - 1);
  };

  const onSubmitSteps = async () => {
    const _inputs = lopHocPhanSelectedFormat?.map((item) => ({
      lopHocPhanId: item?.id,
      nhomThucHanh: item?.nhomThucHanhChoose,
    }));

    const _dataLichTrungRes = await actLichTrung({
      variables: {
        listLopHocPhanPrepareDangKy: _inputs,
        hocKyNormalId: currentHocKy,
      },
    });

    const _dataLichTrung = _dataLichTrungRes?.data?.checkLichTrung?.data?.[0];

    const _isLichTrung = _dataLichTrung?.isTrung;

    if (!_isLichTrung) {
      setState({ errors: false });
      const _dataRes = await actDangKyHocPhan({
        variables: {
          inputs: _inputs,
        },
      });
      const _errors = _dataRes?.data?.dangKyHocPhan?.errors || [];

      if (!isEmpty(_errors)) {
        _errors?.map((item) => {
          Alert.alert(
            'Lỗi',
            item?.message,
            [{ text: 'Ok', onPress: () => console.log('Ok Pressed') }],
            { cancelable: false },
          );
        });
        return;
      }

      const _data = _dataRes?.data?.dangKyHocPhan?.data || [];

      if (isEmpty(_data)) {
        return;
      }

      setDataDKHPResponse(_data?.[0]);
      setIsVisibleModalThanhCong(true);
    } else {
      setState({ errors: true });
      Alert.alert(
        'Thông báo',
        'Trùng lịch học!',
        [{ text: 'Ok', onPress: () => console.log('Ok Pressed') }],
        { cancelable: false },
      );
    }
  };
  const onPress = async () => {
    const _inputs = lopHocPhanSelectedFormat?.map((item) => ({
      lopHocPhanId: item?.id,
      nhomThucHanh: item?.nhomThucHanhChoose,
    }));

    const _dataLichTrung = await actLichTrung({
      variables: {
        listLopHocPhanPrepareDangKy: _inputs,
        hocKyNormalId: currentHocKy,
      },
    });

    const _dataLT = _dataLichTrung.data?.checkLichTrung?.data;

    setListLichTrung(_dataLT?.[0]?.listNgayTrongTuan);

    _dataLT.map((item) => {
      setIsTrung(_dataLT?.[0]?.isTrung);
      setIsVisibleModalLichHoc(true);
    });
  };
  /**
   * render UI
   */
  return (
    <BackgroundView>
      <TouchableOpacity style={styles.goback} onPress={() => nav.goBack()}>
        <Ionicons name="chevron-back-sharp" size={35} />
      </TouchableOpacity>
      <ProgressSteps
        labelColor="#393939"
        disabledStepIconColor="#757575"
        progressBarColor="#757575"
      >
        <ProgressStep
          label="Học phần"
          onNext={onPaymentStepComplete}
          onPrevious={onPrevStep}
          errors={state.errors}
          nextBtnText="Tiếp tục"
        >
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
          previousBtnStyle={{ textAlign: 'center', padding: 8 }}
        >
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
          previousBtnText="Trở về"
        >
          <View style={{ paddingHorizontal: 10, flexDirection: 'row-reverse' }}>
            <TouchableOpacity
              onPress={() => onPress()}
              style={{
                height: 40,
                fontSize: 20,
                width: 200,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.lightOrange,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white' }}>Kiểm tra lịch trùng</Text>
            </TouchableOpacity>
          </View>

          <ModalLichTrung
            onClose={() => setIsVisibleModalLichHoc(false)}
            isVisible={isVisibleModalLichTrung}
            data={listLichTrung}
            isTrung={isTrung}
          />
          <Step3 onChange={handleStep3Change} data={lopHocPhanSelectedFormat} />
        </ProgressStep>
      </ProgressSteps>
      <Loader visible={loadingGetHocPhanDangKy || loadingDangKyHocPhan} />
      <ModalSuccess
        data={dataDKHPResponse}
        visible={isVisibleModalThanhCong}
        closeModal={handleCloseModalSuccess}
      />
    </BackgroundView>
  );
};
const styles = StyleSheet.create({
  goback: {
    position: 'absolute',
    paddingTop: 30,
    paddingLeft: 10,
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
