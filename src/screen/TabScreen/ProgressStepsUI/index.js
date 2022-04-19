import {
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {BackgroundView} from '../../../components';
import FlatlistUI from './components/FlatlistUI';
import {useNavigation} from '@react-navigation/native';
import {screenName} from '../../../utils/constantScreenName';
import {useSelector} from 'react-redux';
import {getListMonHocSelectors} from '../../../redux/selectors/selectorStudents';
import LopHocPhan from './components/LopHocPhan';
import queries from '../../../core/GraphQl';
import {GETLOPHOCPHANFRAGMENT} from './fragment';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import Step3 from './components/Step3Render';
import {isEmpty} from 'lodash';

import Modal from 'react-native-modal';

const getHocPhanForDKHP = queries.query.getListHocPhanDKHP(
  GETLOPHOCPHANFRAGMENT,
);
const dangKyHocPhanMutation = queries.mutation.dangKyHocPhan();

const ProgressStepsUI = ({route}) => {
  const {currentHocKy} = route.params;

  /**
   * API
   * ===========================================
   */

  const {data: dataGetHocPhanDangKy} = useQuery(getHocPhanForDKHP, {
    skip: !currentHocKy,
    variables: {
      hocKyNormalId: currentHocKy,
      kieu: 'HOC_MOI',
    },
  });

    /**
    * UseEffect
    * ==========================================
    */

  const [actDangKyHocPhan, {data: dataDangKyHocPhan}] = useMutation(
    dangKyHocPhanMutation,
  );

  const [actDangKyHocPhan, {data: dataDangKyHocPhan}] = useMutation(
    dangKyHocPhanMutation,
  );

  /**
   *  const
   */
  const nav = useNavigation();
  const [currentActive, setCurrentActive] = useState(0);
  const [hocPhanSelected, setHocPhanSelected] = useState([]);
  const [lopHocPhanSelected, setLopHocPhanSelected] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [isVisibleModalThanhCong, setIsVisibleModalThanhCong] = useState(false);

  /**
   * UseEffect
   * ==========================================
   */

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
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
    console.log('Payment step completed!');
  };

  const onPaymentStepComplete = () => {
    console.log('null');
  };

  const onPrevStep = () => {
    setCurrentActive(currentActive - 1);
  };

  const onSubmitSteps = async () => {
    const _inputs = dataSubmit;

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

    // nav.navigate(screenName.dkhp);
  };

  /**
   * render UI
   */
  return (
    <BackgroundView>
      <ProgressSteps
        labelColor="#393939"
        disabledStepIconColor="#757575"
        progressBarColor="#757575">
        <ProgressStep
          label="Học phần"
          onNext={onPaymentStepComplete()}
          onPrevious={onPrevStep}
          nextBtnText="Tiếp tục">
          <FlatlistUI
            onSelectChange={handleHocPhanChange}
            data={listHocPhanDangKy}
            chitiet={false}
          />
        </ProgressStep>
        <ProgressStep
          label="Lớp học phần"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText="Trở về"
          nextBtnText="Tiếp tục"
          previousBtnStyle={{textAlign: 'center', padding: 8}}>
          <LopHocPhan
            onChange={handleLopHocPhanChange}
            data={hocPhanSelected}
          />
        </ProgressStep>
        <ProgressStep
          label="Chi tiết lớp học"
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          previousBtnText="Trở về">
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
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
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
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </BackgroundView>
  );
};
const styles = StyleSheet.create({
  viewStep1: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtheader: {color: 'black', fontWeight: '600', fontSize: 18},
  txtRenderChonMH: {color: 'black', fontWeight: '600', fontSize: 18},
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
