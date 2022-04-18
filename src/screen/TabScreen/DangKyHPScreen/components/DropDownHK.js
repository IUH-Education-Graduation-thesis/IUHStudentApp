import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

import queries from '../../../../core/GraphQl';
import { useQuery } from '@apollo/client';
import { GETPROFILESINHVIEN } from '../fragment';
import { useDispatch } from 'react-redux';
import { setHocKyID } from '../../../../redux/actions/studentActions';

/**
 *  call graphql
 */
const getProfileQuery = queries.query.getProfile(GETPROFILESINHVIEN);
const DropDownHK = () => {
    const { data: dataGetProfile, loading: loadingGetProfile, error: errorGetProfile } = useQuery(getProfileQuery);
    const [dataGetHocKy, setDataGetHocKy] = useState([]);
    const [hocKy, setHocKy] = useState('1');
    const dispatch = useDispatch();
    useEffect(() => {
        const _hocKy = dataGetProfile?.getProfile.data[0].sinhVien.lop.khoa.hocKies;
        setDataGetHocKy(_hocKy);
        dispatch(setHocKyID(dataGetProfile?.getProfile.data[0].sinhVien.lop.khoa.hocKies[0].thuTu));
    }, [dataGetProfile?.getProfile.data[0].sinhVien.lop.khoa.hocKies])
    return (
        <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            imageStyle={styles.imageStyle}
            maxHeight={150}
            value={hocKy}
            data={dataGetHocKy}
            valueField="id"
            labelField="thuTu"
            onChange={e => {
                setHocKy(e.id);
                dispatch(setHocKyID(e.id));
            }}
        />
    )
}
const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        width: 145,
        backgroundColor: 'white',
        borderRadius: 22,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
        paddingHorizontal: 8,
        textAlign: 'center'
    },
    containerStyle: {
        paddingLeft: 0,
    }, imageStyle: {
        width: 0,
        margin: 0
    }
});
export default DropDownHK