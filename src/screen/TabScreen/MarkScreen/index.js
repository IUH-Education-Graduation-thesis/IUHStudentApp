import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import { IC_ARR_DOWN, IC_ARR_UP } from "./icons"
import Accordion from "react-native-collapsible/Accordion";
import BackgroundView from "../../../components/BackgroundView";
// import BottomSheetBehavior from "reanimated-bottom-sheet";
const sample = [
    {
        title: "HK1(2018-2019)",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "HK2(2018-2019)",
        data: ["French Fries", "Onion Rings", "Fried Shrimps", "Apple", "Banana"]
    },
    {
        title: "HK3(2018-2019)",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "HK1(2019-2020)",
        data: ["Cheese Cake", "Ice Cream"]
    }
];

const MarkScreen = () => {
    const sheetRef = useRef(null);
    const [state, setState] = useState({
        activeSections: [],
    });
    const _renderHeader = section => (
        <View key={section} style={styles.item} >
            <Text style={styles.title}>{section.title}</Text>
            <Image source={IC_ARR_DOWN} />
        </View>
    );
    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        >
            <Text>Swipe down to close</Text>
        </View>
    );
    const _renderContent = section => {
        return section.data.map((item, index) => {
            if (index > -1) {
                return (
                    <TouchableOpacity key={index} onPress={() => sheetRef.current.snapTo(0)} style={styles.subitem}>
                        <Text style={styles.subtitle}>{item}</Text>
                    </TouchableOpacity>
                );
            }
        });
    };

    const _updateSections = activeSections => {
        setState({ activeSections });
    };

    const onPress = () => { };
    return (
        <SafeAreaView style={styles.container}>
            <BackgroundView>
                <View style={styles.headerView}>
                    <Text style={styles.textHeader}>Kết quả học tập</Text>
                </View>
                <ScrollView>
                    <Accordion
                        sections={sample}
                        keyExtractory={(item, index) => index}
                        activeSections={state.activeSections}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={_updateSections}
                    />
                </ScrollView>
            </BackgroundView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    subitem: {
        backgroundColor: "lightblue",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
    },
    title: {
        fontSize: 20
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
    },
    contentView: {
        flex: 1.4,
    },
    textHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: "600"
    },
});

export default MarkScreen