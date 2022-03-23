import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import BackgroundView from '../../../../components/BackgroundView';
const DropDownHK = () => {
    const local_data = [
        {
            value: '1',
            lable: 'HK1(2018-2019)',
        },
        {
            value: '2',
            lable: 'HK2(2018-2019)',
        },
        {
            value: '3',
            lable: 'HK3(2018-2019)',
        },
        {
            value: '4',
            lable: 'HK1(2019-2020)',
        },
        {
            value: '5',
            lable: 'HK2(2019-2020)',
        },
    ];
    const [state, SetState] = useState({
        contents: [
            {
                title: 'Học kỳ 1( 2018-2019)',
                body:
                {
                    stt: 1,
                    tenMonHoc: "Công nghệ mới",
                    diemTB: `8.6`
                }
            },
            {
                title: 'Học kỳ 2( 2018-2019)',
                body: {
                    stt: 1,
                    tenMonHoc: "Công nghệ mới",
                    diemTB: `8.6`
                },
            },
            {
                title: 'Học kỳ 3( 2018-2019)',
                body: {
                    stt: 1,
                    tenMonHoc: "Công nghệ mới",
                    diemTB: `8.6`
                },
            },
        ],
    });
    const [country, setCountry] = useState('1');
    return (
        <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.containerStyle}
            maxHeight={150}
            value={country}
            data={local_data}
            valueField="value"
            labelField="lable"
            onChange={e => {
                setCountry(e.value);
            }}
        />
    )
}
const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        width: 170,
        backgroundColor: 'white',
        borderRadius: 22,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    containerStyle: {
        paddingLeft: 0,
    }
});
export default DropDownHK