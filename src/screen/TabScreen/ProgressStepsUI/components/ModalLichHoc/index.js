import Modal from 'react-native-modal';
import React, { useMemo } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import Text from '../../../../../components/Text';

const ModalLichHoc = ({ data, isVisible, onClose }) => {
  const lichHocs = data?.lichHocs || [];

  /**
   * Fucntion
   * =======================================
   */

  const handleCloseModal = () => {
    onClose();
  };

  /**
   * Render view
   * =======================================================
   */

  const renderLicHoc = useMemo(() => {
    return lichHocs?.map(item => {
      const _isThucHanh = !item?.isLyThuyet;
      const _titleLicHoc = _isThucHanh ? 'TH' : 'LT';
      const _thu =
        item?.ngayHocTrongTuan === 8
          ? 'Chủ nhật'
          : `Thứ ${item?.ngayHocTrongTuan}`;
      const _tiet = `T${item?.tietHocBatDau} - T${item?.tietHocKetThuc}`;

      const _thoiGianBatDau = moment(item?.thoiGianBatDau);
      const _thoiGianKetThuc = moment(item?.thoiGianKetThuc);

      const _time = `${_thoiGianBatDau.format(
        'DD/MM/YYYY',
      )} - ${_thoiGianKetThuc?.format('DD/MM/YYYY')}`;

      return (
        <View
          style={{
            backgroundColor: _isThucHanh ? '#B9F8D3' : '#E78EA9',
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginTop: 10,
          }}>
          <Text>{`${_titleLicHoc} - ${_thu} (${_tiet})`}</Text>
          {_isThucHanh && <Text>{`Nhóm TH: ${item?.nhomThucHanh}`}</Text>}
          <Text>{`Phòng học: ${item?.phongHoc?.tenPhongHoc}`}</Text>
          <Text>{`Dãy nhà: ${item?.phongHoc?.dayNha?.tenDayNha}`}</Text>
          <Text>{`Giảng viên: ${item?.giangVien?.hoTenDem ? item?.giangVien?.hoTenDem : "Giảng viên tạm"} ${item?.giangVien?.ten ? item?.giangVien?.ten : ""}`}</Text>
          <Text>{`Thời gian: ${_time}`}</Text>
        </View>
      );
    });
  }, [lichHocs]);

  return (
    <Modal
      style={{ backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }}
      isVisible={isVisible}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              backgroundColor: '#40DFEF',
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Lịch học</Text>
          </View>
          <ScrollView style={{ marginTop: 10, paddingHorizontal: 10 }}>
            {renderLicHoc}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{ backgroundColor: '#1da1f2', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLichHoc;
