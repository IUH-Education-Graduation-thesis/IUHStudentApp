import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Button = props => {
  const { textBtn, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.styleBtn}>
      <Text style={{ color: 'white', fontSize: 16 }}>{textBtn}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  styleBtn: {
    backgroundColor: '#1da1f2',
    borderRadius: 5,
    width: '20%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
export default Button;
