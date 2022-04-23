import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {setMonHocID} from '../../../../redux/actions/studentActions';
const FlatlistUI = prop => {
  const {data, chitiet, onSelectChange} = prop;
  const dispatch = useDispatch();

  const [checkedHocPhan, setCheckedHocPhan] = useState([]);

  const [state, setState] = useState({
    ids: [],
  });

  useEffect(() => {
    dispatch(setMonHocID(state.ids));
  }, [state.ids]);
  /**
   * Function logic renderItem
   *
   */

  const toggleChecked = itemId => {
    const _current = checkedHocPhan?.filter(item => item !== itemId);

    if (checkedHocPhan?.includes(itemId)) {
      setCheckedHocPhan(_current);
      onSelectChange(_current);
      return;
    }

    setCheckedHocPhan([...checkedHocPhan, itemId]);
    onSelectChange([...checkedHocPhan, itemId]);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            marginBottom: 10,
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
          }}>
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedHocPhan?.includes(item?.id)}
            onPress={() => toggleChecked(item.id)}
          />
          <View>
            <Text style={styles.txtRenderChonMH}>{item.maHocPhan}</Text>
            <Text style={styles.txtRenderChonMH}>{item.monHoc.ten}</Text>

            <Text style={styles.txtRenderChonMH}>
              Tín chỉ: {item?.soTinChiLyThuyet + item?.soTinChiThucHanh}
            </Text>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Text style={styles.txtRenderChonMH1}>Bắt buộc:</Text>
              {item.batBuoc ? (
                <AntDesign
                  name="checkcircle"
                  size={25}
                  color={'green'}
                  style={{marginLeft: 15}}
                />
              ) : (
                <MaterialIcons
                  name="cancel"
                  size={30}
                  color={'red'}
                  style={{marginLeft: 15}}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  /**
   * function logic render redernCTMonHoc
   */

  const redernCTMonHoc = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={styles.txtRenderChonMH}>
          {item.mahp} - {item.tenMon}
        </Text>
        <Text style={styles.txtRenderChonMH}>Tín chỉ: {item.tinChi}</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text style={styles.txtRenderChonMH1}>Bắt buộc:</Text>
          {item.batbuoc ? (
            <AntDesign
              name="checkcircle"
              size={25}
              color={'green'}
              style={{marginLeft: 15}}
            />
          ) : (
            <MaterialIcons
              name="cancel"
              size={30}
              color={'red'}
              style={{marginLeft: 15}}
            />
          )}
        </View>
        <Text style={styles.txtRenderChonMH}>GV: {item.tenGV}</Text>
        <Text style={styles.txtRenderChonMH}>Tiết: {item.tiet}</Text>
        <Text style={styles.txtRenderChonMH}>Thứ : {item.thu}</Text>
      </View>
    );
  };
  return (
    <FlatList data={data} renderItem={chitiet ? redernCTMonHoc : renderItem} />
  );
};
const styles = StyleSheet.create({
  viewStep1: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtheader: {color: 'black', fontWeight: '600', fontSize: 18},
  txtRenderChonMH: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
    marginRight: 50,
  },
  txtRenderChonMH1: {color: 'black', fontWeight: '600', fontSize: 18},
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
});
export default FlatlistUI;
