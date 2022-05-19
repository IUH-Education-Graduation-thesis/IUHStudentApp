import { TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { styles } from './style';
import BackgroundView from '../../../components/BackgroundView';
import { Table, TableWrapper, Row, Rows, Col, Cell, Cols } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../utils/constantScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { getSinhVienSelectors } from '../../../redux/selectors/selectorStudents';
import Text from '../../../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSinhVienSuccess } from '../../../redux/actions/studentActions';

const ProfileScreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch()
  const sv = useSelector(getSinhVienSelectors);

  const date = new Date(sv?.ngaySinh);
  const table = useState({
    tableTitle: [
      'Trạng thái:',
      'Ngày sinh:',
      'MSSV:',
      'Lớp:',
      'Bậc đào tạo:',
      'Khoa:',
      'Chuyên ngành:',
      'Địa chỉ:',
      'Số điện thoại:',
      'Nơi sinh:',
    ],
    student: {
      name: `${sv?.hoTenDem + ' ' + sv?.ten} `,
      status: `${sv?.trangThai === 'DANG_HOC' ? 'Đang học' : 'Ra trường'}`,
      dateOfBirth: `${date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()}`,
      mssv: `${sv?.maSinhVien}`,
      className: `${sv?.lop?.ten}`,
      bacDaotao: `${sv?.bacDaoTao === 'DAI_HOC' ? 'Đại học' : 'Cao đẳng'}`,
      khoa: `${sv?.lop?.khoa?.khoa}`,
      chuyenNganh: 'Kỹ thuật phần mềm',
      diaChi: `${sv?.diaChi ? sv?.diaChi : ""}`,
      phoneNumber: `${sv?.soDienThoai}`,
      placeOfBirth: `${sv?.noiSinh ? sv?.noiSinh : ""}`,
    },
  });

  const student = Object.values(table[0].student);
  const onPress = () => {
    const deleteToken = async () => {
      try {
        await AsyncStorage.removeItem('@token');
        dispatch(getSinhVienSuccess(""))
        nav.navigate(screenName.signIn);
      } catch (e) {
        console.log('e', e);
      }
    };

    deleteToken();
  };
  const tableRender = useMemo(() => {
    return <Table>
      <TableWrapper style={styles.wrapper}>
        <Col
          data={table[0].tableTitle}
          style={styles.title}
          heightArr={[35, 35, 35, 35, 35, 35, 35, 35, 35, 35]}
          textStyle={styles.text}
        />
        <Col
          data={student.slice(1)}
          style={styles.title}
          heightArr={[35, 35, 35, 35, 35, 35, 35, 35, 35, 35]}
          textStyle={styles.text}
        />
      </TableWrapper>
    </Table>
  }, [table, student])
  return (
    <BackgroundView>
      <View style={styles.headerView}>
        <Text style={styles.textHeader}>Thông tin sinh viên</Text>
        <View style={styles.imgView} />
        <Text style={styles.textSVHeader}>{table[0].student.name}</Text>
      </View>
      <View style={styles.contentView}>
        {tableRender}
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
            <Text style={styles.textBtn}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundView>
  );
};
export default ProfileScreen;
