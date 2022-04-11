import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import BackgroundView from '../../../components/BackgroundView'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../utils/constantScreenName'
import { useSelector } from 'react-redux'
import { getSinhVienSelectors } from '../../../redux/selectors/selectorStudents'
import { useQuery } from '@apollo/client'
import queries from "../../../core/GraphQl"
import { SINHVIEN_FRAGMENT } from './fragment'

const getAllSinhVien = queries.query.findSinhVien(SINHVIEN_FRAGMENT)

const ProfileScreen = () => {
    const nav = useNavigation()
    const { data: dataGetSV, loading: loadingGetSV } = useQuery(getAllSinhVien);
    const table = useState({
        tableTitle: ['Trạng thái:', 'Ngày sinh:', 'MSSV:', 'Lớp:', "Bậc đào tạo:", "Khoa:", "Chuyên ngành:", "Địa chỉ:", "Số điện thoại:", "Nơi sinh:"],
        student: {
            name: "Đoàn Thị Thanh Hồng",
            status: "Đang học",
            dateOfBirth: "31/12/2000",
            mssv: 18050761,
            className: "DHKTPM14BTT",
            bacDaotao: "Đại học",
            khoa: "Khoa Công nghệ thông tin",
            chuyenNganh: "Kỹ thuật phần mềm",
            diaChi: "",
            phoneNumber: "0372774389",
            placeOfBirth: "Lâm Đồng",
        }
    })
    // const infoStudent = useSelector(getSinhVienSelectors);
    console.log("sinhvien", dataGetSV);
    // useEffect(() => {
    //     const _listSV =
    //     dataGetSV?.info_sv?.data?.map((item) => ({
    //         ...item,
    //         key: item?.id,
    //       })) || [];
    //     setData(_listDayNha);
    //   }, [dataGetSV]);
    const student = Object.values(table[0].student);
    return (
        <BackgroundView>
            <View style={styles.headerView}>
                <Text style={styles.textHeader}>Thông tin sinh viên</Text>
                <View style={styles.imgView} />
                <Text style={styles.textSVHeader}>{table[0].student.name}</Text>
            </View>
            <View style={styles.contentView}>
                <Table >
                    <TableWrapper style={styles.wrapper}>
                        <Col data={table[0].tableTitle} style={styles.title} heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28,]} textStyle={styles.text} />
                        <Col data={student.slice(1)} style={styles.title} heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28,]} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => nav.navigate(screenName.signIn)}>
                        <Text style={styles.textBtn}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BackgroundView>
    )
}
export default ProfileScreen