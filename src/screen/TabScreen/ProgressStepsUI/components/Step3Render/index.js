import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {View, Text, Image} from 'react-native';
import {IC_ARR_DOWN} from '../../../MarkScreen/icons';
import {isEmpty} from 'lodash';
import moment from 'moment';
import {RadioButton} from 'react-native-paper';

const Step3 = ({data, onChange}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [checkedLichHoc, setCheckedLichHoc] = useState([]);

  /**
   * useEffect
   * ===================================================
   *
   */

  /**
   * Handle default data for checked lich hoc when init component
   */
  useEffect(() => {
    const _checkedLichHoc = data?.map(item => {
      const _nhomThucHanh = item?.lichHocs?.filter(
        _item => !_item?.isLyThuyet,
      )?.[0]?.nhomThucHanh;

      return {
        lopHocPhanId: item?.id,
        nhomThucHanh: _nhomThucHanh,
      };
    });

    setCheckedLichHoc(_checkedLichHoc);
  }, [data]);

  useEffect(() => {
    if (isEmpty(checkedLichHoc)) return;

    onChange(checkedLichHoc);
  }, [checkedLichHoc]);

  /**
   * Function
   * ==================================================
   */
  const setSections = sections => {
    // Setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const handleClickRadioButton = (lopHocPhanId, nhomThucHanh) => {
    const _index = checkedLichHoc?.findIndex(
      item => item?.lopHocPhanId === lopHocPhanId,
    );

    const _checkedLopHocPhan = [
      ...checkedLichHoc?.slice(0, _index),
      {
        ...checkedLichHoc?.[_index],
        nhomThucHanh,
      },
      ...checkedLichHoc?.slice(_index + 1),
    ];

    setCheckedLichHoc(_checkedLopHocPhan);
  };

  /**
   * render view
   * ===============================================
   */

  const renderHeader = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          {item?.tenLopHocPhan}
        </Text>
        <Image source={IC_ARR_DOWN} />
      </View>
    );
  };

  const renderListLicHoc = lichHocs => {
    if (isEmpty(lichHocs)) return;

    return lichHocs
      ?.filter(item => item?.isLyThuyet)
      ?.map(item => {
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
              marginTop: 10,
              padding: 10,
            }}>
            <Text>{`${_titleLicHoc} - ${_thu} (${_tiet})`}</Text>
            {_isThucHanh && <Text>{`Nhóm TH: ${item?.nhomThucHanh}`}</Text>}
            <Text>{`Phòng học: ${item?.phongHoc?.tenPhongHoc}`}</Text>
            <Text>{`Dãy nhà: ${item?.phongHoc?.dayNha?.tenDayNha}`}</Text>
            <Text>{`Giảng viên: ${item?.giangVien?.hoTenDem} ${item?.giangVien?.ten}`}</Text>
            <Text>{`Thời gian: ${_time}`}</Text>
          </View>
        );
      });
  };

  const renderListLichHocThucHanh = (lopHocPhanId, lichHocs) => {
    const _listLichHocThucHanh = lichHocs?.filter(item => !item?.isLyThuyet);

    return _listLichHocThucHanh?.map(item => {
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

      const _isChecked = checkedLichHoc?.find(
        _item =>
          _item?.lopHocPhanId === lopHocPhanId &&
          _item?.nhomThucHanh === item?.nhomThucHanh,
      );

      return (
        <View
          style={{
            backgroundColor: _isThucHanh ? '#B9F8D3' : '#E78EA9',
            borderRadius: 5,
            marginTop: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <RadioButton
              status={_isChecked ? 'checked' : 'unchecked'}
              onPress={() =>
                handleClickRadioButton(lopHocPhanId, item?.nhomThucHanh)
              }
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text>{`${_titleLicHoc} - ${_thu} (${_tiet})`}</Text>
            {_isThucHanh && <Text>{`Nhóm TH: ${item?.nhomThucHanh}`}</Text>}
            <Text>{`Phòng học: ${item?.phongHoc?.tenPhongHoc}`}</Text>
            <Text>{`Dãy nhà: ${item?.phongHoc?.dayNha?.tenDayNha}`}</Text>
            <Text>{`Giảng viên: ${item?.giangVien?.hoTenDem} ${item?.giangVien?.ten}`}</Text>
            <Text>{`Thời gian: ${_time}`}</Text>
          </View>
        </View>
      );
    });
  };

  const renderContent = item => {
    const _lichHocs = item?.lichHocs || [];

    return (
      <View
        style={{
          backgroundColor: 'white',
          borderTopColor: 'grey',
          borderTopWidth: 1,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}>
        {renderListLicHoc(_lichHocs)}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'grey',
            marginVertical: 10,
          }}
        />
        {renderListLichHocThucHanh(item?.id, _lichHocs)}
      </View>
    );
  };

  return (
    <ScrollView>
      <Accordion
        sections={data}
        keyExtractory={(item, index) => index}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setSections}
      />
    </ScrollView>
  );
};

export default Step3;
