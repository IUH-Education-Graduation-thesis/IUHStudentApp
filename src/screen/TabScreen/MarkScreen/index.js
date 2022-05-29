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
import { IC_ARR_DOWN, IC_ARR_UP } from './icons';
import Accordion from 'react-native-collapsible/Accordion';
import BackgroundView from '../../../components/BackgroundView';
import Text from '../../../components/Text';
import Antdesign from 'react-native-vector-icons/AntDesign';
import queries from '../../../core/GraphQl';
import { GETDIEM_FRAGMENT } from './fragment';
import { useQuery } from '@apollo/client';
import CTDiem from './components/CTDiem';
import { styles } from './styles';
import { isEmpty } from 'lodash';
import Loader from '../../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import { Row, Rows, Table } from 'react-native-table-component';

const getDiemQuery = queries.query.getDiem(GETDIEM_FRAGMENT);

const MarkScreen = (props) => {
  /**
   * const
   */
  const [currentDiem, setCurrentDiem] = useState();
  const [isShow, setShow] = useState(false);
  const [activeSections, setActiveSections] = useState([]);

  const {
    data: dataGetDiem,
    loading: loadingGetDiem,
    error,
    refetch: refetchGetDiem,
  } = useQuery(getDiemQuery, { fetchPolicy: 'network-only' });
  const listDiem = dataGetDiem?.getDiem?.data || [];

  const nav = useNavigation();
  /**
   * useEffect
   * =====================================================================
   */

  useEffect(() => {
    const unsubscribe = nav.addListener('focus', () => {
      refetchGetDiem();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [nav]);

  useEffect(() => {
    if (isEmpty(listDiem)) return;

    const ids = listDiem.map((item, index) => index);
    setActiveSections(ids);
  }, [listDiem, setActiveSections]);

  /**
   * Function
   */
  const show = () => {
    setShow(true);
  };
  const close = () => {
    setShow(false);
  };
  const _renderHeader = (section, index, isActive) => (
    <View key={section} style={styles.item}>
      <Text style={styles.title}>
        HK{section.thuTuHocKy}({section.namBatDau + '-' + section.namKetThuc})
      </Text>
      <Image source={isActive ? IC_ARR_DOWN : IC_ARR_UP} />
    </View>
  );

  const _renderContent = (section) => {
    const _data = section?.listSinhVienLopHocPhan || [];

    const _head = ['STT', 'Môn học', 'Điểm'];

    return (
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row flexArr={[1, 5, 1]} data={_head} style={_styles.head} textStyle={_styles.text} />
        {_data?.map((item, index) => {
          const _content = [
            index + 1,
            item?.lopHocPhan?.tenLopHocPhan,
            item?.diemTrungBinh ? Math.round(item.diemTrungBinh * 10) / 10 : '',
          ];

          return (
            <TouchableOpacity key={item?.id} onPress={() => onShowUp(item)} style={styles.subitem}>
              <Row
                flexArr={[1, 5, 1]}
                style={{ ..._styles.head, borderTopWidth: 0.5, borderTopColor: 'grey' }}
                data={_content}
                textStyle={_styles.text}
              />
            </TouchableOpacity>
          );
        })}
      </Table>
    );
  };
  const onShowUp = (item) => {
    show();
    setCurrentDiem(item);
  };
  const onClosePopup = () => {
    close();
  };
  const _updateSections = (activeSections) => {
    setActiveSections(activeSections.includes(undefined) ? [] : activeSections);
  };

  const renderDiem = useMemo(() => {
    if (error) {
      return (
        <View>
          <Text>Error data...</Text>
        </View>
      );
    }
    return (
      <Accordion
        sections={listDiem}
        keyExtractory={(item, index) => index}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
    );
  }, [
    loadingGetDiem,
    dataGetDiem,
    listDiem,
    _renderContent,
    _renderHeader,
    _updateSections,
    activeSections,
  ]);
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
        <ScrollView>{renderDiem}</ScrollView>
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
                <CTDiem ten="Ghi chú" style={{ fontSize: 20, fontWeight: '700' }} />
              </View>
            </View>
          </View>
        </Modal>
      </BackgroundView>
      <Loader visible={loadingGetDiem} />
    </SafeAreaView>
  );
};

const _styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'black' },
});

export default MarkScreen;
