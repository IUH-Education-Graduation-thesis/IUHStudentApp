import Modal from 'react-native-modal';
import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import moment from 'moment';

import { IC_ARR_DOWN, IC_ARR_UP } from '../../MarkScreen/icons';
import Accordion from 'react-native-collapsible/Accordion';
import { isEmpty } from 'lodash';
import Text from '../../../../components/Text';

const ModalLichTrung = ({ data, isVisible, onClose, isTrung }) => {
  const [activeSections, setActiveSections] = useState([]);

  useEffect(() => {
    const ids = data.map((item, index) => index);
    setActiveSections(ids);
  }, [data]);

  /**
   * Fucntion
   * =======================================
   */

  const handleCloseModal = () => {
    onClose();
  };

  const _renderHeader = (section, index, isActive) => {
    return (
      <View key={section} style={styles.item}>
        <Text style={styles.title}>{section.thu}</Text>
        <Image source={isActive ? IC_ARR_DOWN : IC_ARR_UP} />
      </View>
    );
  };

  const _renderContent = (item) => {
    const _listLichHoc = item?.lichHocs.map((lh) => {
      const _isThucHanh = !lh.isLyThuyet;
      const _titleLicHoc = _isThucHanh ? 'TH' : 'LT';
      const _thu = lh?.ngayHocTrongTuan === 8 ? 'Chủ nhật' : `Thứ ${lh?.ngayHocTrongTuan}`;
      const _tiet = `T${lh?.tietHocBatDau} - T${lh?.tietHocKetThuc}`;
      const _thoiGianBatDau = moment(lh.thoiGianBatDau);
      const _thoiGianKetThuc = moment(lh.thoiGianKetThuc);

      const _time = `${_thoiGianBatDau.format('DD/MM/YYYY')} - ${_thoiGianKetThuc?.format(
        'DD/MM/YYYY',
      )}`;

      return (
        <View
          style={{
            backgroundColor: _isThucHanh ? '#B9F8D3' : '#E78EA9',
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginTop: 10,
          }}
        >
          <Text>{`${_titleLicHoc} - ${_thu} (${_tiet})`}</Text>
          {_isThucHanh && <Text>{`Nhóm TH: ${lh?.nhomThucHanh}`}</Text>}
          <Text>{`Phòng học: ${lh?.phongHoc?.tenPhongHoc}`}</Text>
          <Text>{`Dãy nhà: ${lh?.phongHoc?.dayNha?.tenDayNha}`}</Text>
          <Text>{`Giảng viên: ${
            lh?.giangVien?.hoTenDem ? lh?.giangVien?.hoTenDem : 'Giảng viên tạm'
          } ${lh?.giangVien?.ten ? item?.giangVien?.ten : ''}`}</Text>
          <Text>{`Thời gian: ${_time}`}</Text>
        </View>
      );
    });

    return <View>{_listLichHoc}</View>;
  };
  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  /**
   * Render view
   * =======================================================
   */

  const renderListLichTrung = () => {
    return (
      <Accordion
        sections={data}
        keyExtractory={(item, index) => index}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={setSections}
      />
    );
  };
  return (
    <Modal
      style={{ backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }}
      isVisible={isVisible}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: '#40DFEF',
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Lịch trùng</Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{ backgroundColor: '#1da1f2', padding: 10, borderRadius: 5, marginLeft: 200 }}
            >
              <Text style={{ color: 'white' }}>Đóng</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginTop: 10, paddingHorizontal: 10 }}>
            {isTrung ? (
              renderListLichTrung()
            ) : (
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Không có lịch trùng</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subitem: {
    backgroundColor: 'lightblue',
    paddingBottom: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  headerView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#4baef9',
  },
  contentView: {
    flex: 1.4,
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: '500',
    height: 40,
    backgroundColor: '#bff006',
    marginBottom: 10,
  },
});
export default ModalLichTrung;
