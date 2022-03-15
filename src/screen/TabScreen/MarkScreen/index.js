import React, { useState } from 'react'
import DropDownItem from 'react-native-drop-down-item';
import { Platform, StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from './icons';
import BackgroundView from '../../../components/BackgroundView';

const MarkScreen = () => {

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
    const renderBody = (item) => {
        return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ paddingRight: 20 }}>{item.stt}</Text>
            <Text style={{ paddingRight: 20 }}>{item.tenMonHoc}</Text>
            <Text>{item.diemTB}</Text>
        </View>
    }
    return (
        <BackgroundView>
            <View style={styles.container}>
                <Text style={{ fontSize: 30, fontWeight: '600' }}>Kết quả học tập</Text>
                <ScrollView style={{ alignSelf: 'stretch' }}
                >
                    {
                        state.contents
                            ? state.contents.map((param, i) => {
                                return (
                                    <DropDownItem
                                        key={i}
                                        style={styles.dropDownItem}
                                        contentVisible={false}
                                        invisibleImage={IC_ARR_DOWN}
                                        visibleImage={IC_ARR_UP}
                                        header={
                                            <View style={styles.header}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    color: 'black',

                                                }}>{param.title}</Text>
                                            </View>
                                        }
                                    >
                                        <View>
                                            {renderBody(param.body)}
                                        </View>
                                    </DropDownItem>
                                );
                            })
                            : null
                    }
                    <View style={{ height: 96 }} />
                </ScrollView>
            </View>
        </BackgroundView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        // paddingTop: 60,
    },
    header: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    headerTxt: {
        fontSize: 12,
        color: 'rgb(74,74,74)',
        marginRight: 60,
        flexWrap: 'wrap',
    },
    txt: {
        fontSize: 14,
    },
});
export default MarkScreen