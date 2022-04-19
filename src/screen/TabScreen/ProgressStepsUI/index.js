import {Image, LogBox, ScrollView, StyleSheet, View} from 'react-native';
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
import {useLazyQuery, useQuery} from '@apollo/client';

const getHocPhanForDKHP = queries.query.getListHocPhanDKHP(
  GETLOPHOCPHANFRAGMENT,
);

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

  /**
   *  const
   */
  const nav = useNavigation();
  const [currentActive, setCurrentActive] = useState(0);
  const [hocPhanSelected, setHocPhanSelected] = useState([]);

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

  const onSubmitSteps = () => {
    console.log('called on submit step.');
    nav.navigate(screenName.dkhp);
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
          <LopHocPhan data={hocPhanSelected} />
        </ProgressStep>
        <ProgressStep
          label="Chi tiết lớp học"
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          previousBtnText="Trở về">
          <FlatlistUI data={[]} chitiet={true} />
        </ProgressStep>
      </ProgressSteps>
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
