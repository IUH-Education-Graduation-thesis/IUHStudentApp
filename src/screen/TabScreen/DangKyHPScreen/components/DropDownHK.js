import React from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const DropDownHK = ({ data, onChange, currentHocKy }) => {
  return (
    <SelectDropdown
      buttonStyle={{ width: '60%' }}
      defaultButtonText={`Học kỳ ${currentHocKy?.thuTuHocKy} (${currentHocKy?.namHoc?.namBatDau} - ${currentHocKy?.namHoc?.namKetThuc})`}
      data={data?.map((item) => item?.label)}
      onSelect={(selectedItem, index) => {
        const _value = data?.[index]?.value;

        onChange(_value);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};
const styles = StyleSheet.create({
  dropdown: {
    width: 300,
  },
});
export default DropDownHK;
