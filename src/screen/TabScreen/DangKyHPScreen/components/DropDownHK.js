import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const DropDownHK = ({data, style, onChange}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleValueChange = payload => {
    setValue(payload);
    onChange(payload(value));
  };

  return (
    <DropDownPicker
      style={style}
      value={value}
      open={open}
      items={data}
      setOpen={setOpen}
      setValue={handleValueChange}
      style={styles.dropdown}
    />
  );
};
const styles = StyleSheet.create({
  dropdown: {
    width: 300,
  },
});
export default DropDownHK;
