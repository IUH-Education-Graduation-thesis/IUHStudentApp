import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { BackgroundView } from '../../../components';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { IC_ARR_DOWN, IC_ARR_UP } from '../MarkScreen/icons';
import TableHocPhan from './TableHocPhan';
import queries from '../../../core/GraphQl';
import { useQuery } from '@apollo/client';
import Loader from '../../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';

const getChuongTrinhKhungQuery = queries.query.getChuongTrinhKhung();

const ChuongTrinhKhungScreen = (props) => {
  const nav = useNavigation();

  const [activeSections, setActiveSections] = useState([]);

  /**
   * API
   * ===============================================
   */

  const { data: dataGetChuongTrinhKhung, loading: loadingGetChuongTrinhKhung } =
    useQuery(getChuongTrinhKhungQuery);

  const listHocKy = dataGetChuongTrinhKhung?.getChuongTrinhKhung?.data || [];

  /**
   * useEffect
   * =========================================================================
   */

  useEffect(() => {
    if (isEmpty(listHocKy)) return;

    console.log('hello world');

    const _keys = listHocKy?.map((item, index) => index) || [];

    setActiveSections([..._keys]);
  }, [listHocKy]);

  /**
   * Function
   * =================================================
   */

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections.includes(undefined) ? [] : activeSections);
  };

  /**
   * Render view
   * ===================================================
   */

  const _renderContent = (section) => {
    const _header = ['Mã môn', 'Tên môn học', 'TC', 'Trạng thái'];

    const _data = [
      ...section?.hocPhansRes?.map((item) => [
        item?.maMonHoc,
        item?.tenMonHoc,
        item?.tinChi,
        item?.trangThai && 'Đạt',
      ]),
    ];

    return (
      <View
        style={{
          paddingHorizontal: 10,
          marginBottom: 10,
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
          paddingBottom: 10,
        }}
      >
        <TableHocPhan header={_header} data={_data} />
      </View>
    );
  };

  const _renderHeader = (content, index, active) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        height: 50,
        borderBottomWidth: 0.5,
        marginBottom: 10,
      }}
      key={content}
    >
      <Text>Học kỳ {content.hocKy}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>{`TC (${content?.tongSoTinChi})`}</Text>
        <View style={{ width: 10 }} />
        <Image source={active ? IC_ARR_DOWN : IC_ARR_UP} />
      </View>
    </View>
  );

  return (
    <BackgroundView>
      <Loader visible={loadingGetChuongTrinhKhung} />
      <View style={styles?.wrapper}>
        <View style={styles?.wrapper?.wrap_head}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Icon size={25} name="arrowleft" />
          </TouchableOpacity>
          <View style={{ position: 'relative' }}>
            <Text style={styles?.wrapper?.wrap_head?.title}>Chương trình khung</Text>
          </View>
          <TouchableOpacity>
            <IconEntypo size={25} name="dots-three-horizontal" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <Accordion
            sections={listHocKy}
            keyExtractory={(item, index) => index}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </ScrollView>
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    wrap_head: {
      paddingHorizontal: 20,
      height: 60,
      backgroundColor: '#4baef9',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      title: { fontSize: 20, fontWeight: 'bold' },
    },

    item: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      alignItems: 'center',
      borderColor: 'grey',
    },
  },
});

export default ChuongTrinhKhungScreen;
