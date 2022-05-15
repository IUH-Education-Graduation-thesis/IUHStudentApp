import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from 'react-native';
import { IC_ARR_DOWN } from './icons';
import Accordion from 'react-native-collapsible/Accordion';
import BackgroundView from '../../../components/BackgroundView';
import Text from '../../../components/Text';
import Antdesign from 'react-native-vector-icons/AntDesign';
import queries from '../../../core/GraphQl';
import { GETDIEM_FRAGMENT } from './fragment';
import { useQuery } from '@apollo/client';
import CTDiem from './components/CTDiem';
import { styles } from './styles';
const getDiemQuery = queries.query.getDiem(GETDIEM_FRAGMENT);

const MarkScreen = props => {
  /**
   * const
   */
  const [currentDiem, setCurrentDiem] = useState();
  const [isShow, setShow] = useState(false);
  const [activeSections, setActiveSections] = useState([]);

  const { data: dataGetDiem, loading: loadingGetDiem, error } = useQuery(getDiemQuery);
  const listDiem = dataGetDiem?.getDiem?.data || [];
  /**
   * useEffect
   */
  // useEffect(() => {
  //   const ids = listDiem.map((item, index) => index)
  //   setActiveSections(ids)

  // }, [listDiem, setActiveSections])

  /**
   * Function
   */
  const show = () => {
    setShow(true);
  };
  const close = () => {
    setShow(false);
  };
  const _renderHeader = section => (
    <View key={section} style={styles.item}>
      <Text style={styles.title}>
        HK{section.thuTuHocKy}({section.namBatDau + '-' + section.namKetThuc})
      </Text>
      <Image source={IC_ARR_DOWN} />
    </View>
  );

  const _renderContent = section => {
    return section.listSinhVienLopHocPhan.map((item, index) => {
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => onShowUp(item)}
          style={styles.subitem}>
          <View style={styles.viewContentAccordion}>
            <Text style={[styles.subtitle1]}>
              {index + 1 + '   ' + item?.lopHocPhan?.tenLopHocPhan}
            </Text>
            <Text style={styles.subtitle1}>{item.diemTrungBinh ? Math.round(item.diemTrungBinh * 10) / 10 : ""}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };
  const onShowUp = item => {
    show();
    setCurrentDiem(item);
  };
  const onClosePopup = () => {
    close();
  };
  const _updateSections = activeSections => {
    setActiveSections(activeSections.includes(undefined) ? [] : activeSections);
  };
  const renderDiem = useMemo(() => {
    if (loadingGetDiem) {
      return <View>
        <Text>Loading...</Text>
      </View>
    }
    if (error) {
      return <View>
        <Text>Error data...</Text>
      </View>
    }
    return <Accordion
      sections={listDiem}
      keyExtractory={(item, index) => index}
      activeSections={activeSections}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={_updateSections}
    />
  }, [loadingGetDiem, error, dataGetDiem, listDiem, _renderContent, _renderHeader, _updateSections, activeSections])
  /**
   *
   * render ui
   */
  return (
    <SafeAreaView style={styles.container}>
      <BackgroundView>
        <View style={styles.headerView}>
          <Text style={styles.textHeader}>Kết quả học tập</Text>
        </View>
        <ScrollView>
          {renderDiem}
        </ScrollView>
        <Modal animationType="fade" transparent={true} visible={isShow}>
          <View style={styles.styleView}>
            <View style={styles.styleBottom}>
              <View>
                <View style={styles.viewheaderBottom}>
                  <Text style={styles.textHeaderBottom}>
                    {currentDiem?.lopHocPhan?.tenLopHocPhan}
                  </Text>
                  <TouchableOpacity onPress={onClosePopup}>
                    <Antdesign name="closecircleo" size={25} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: 'gray' }} />
                <CTDiem ten="Điểm thường kỳ" diem={currentDiem?.diemThuongKy} />
                <CTDiem ten="Điểm giữa kỳ" diem={currentDiem?.diemGiuaKy} />
                <CTDiem ten="Điểm thực hành" diem={currentDiem?.diemCuoiKy} />
                <CTDiem ten="Điểm cuối kỳ" diem={currentDiem?.diemCuoiKy} />
                <View style={{ height: 1, backgroundColor: 'gray' }} />
                <CTDiem
                  ten="Điểm trung bình"
                  style={{ fontSize: 20, fontWeight: '700' }}
                  diem={currentDiem?.diemTrungBinh}
                />
                <CTDiem
                  ten="Ghi chú"
                  style={{ fontSize: 20, fontWeight: '700' }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </BackgroundView>
    </SafeAreaView>
  );
};

export default MarkScreen;
