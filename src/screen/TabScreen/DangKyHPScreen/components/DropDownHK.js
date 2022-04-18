import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const DropDownHK = ({data, style}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <DropDownPicker
      style={style}
      value={value}
      open={open}
      items={data}
      setOpen={setOpen}
      setValue={setValue}
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
