import React, { createRef, useRef, useState } from "react";
import {
    StyleSheet,

    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { IC_ARR_DOWN, IC_ARR_UP } from "./icons"
import Accordion from "react-native-collapsible/Accordion";
import BackgroundView from "../../../components/BackgroundView";
import BottomPopup from "./components/BottomPopup";
import Text from "../../../components/Text";
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

const MarkScreen = (props) => {
    const popRef = createRef()
    const sheetRef = useRef();
    const [state, setState] = useState({
        activeSections: [],
    });
    const _renderHeader = section => (
        <View key={section} style={styles.item} >
            <Text style={styles.title}>{section.title}</Text>
            <Image source={IC_ARR_DOWN} />
        </View>
    );

    const _renderContent = section => {
        return section.data.map((item, index) => {
            if (index > -1) {
                return (
                    <TouchableWithoutFeedback key={index} onPress={onShowUp} style={styles.subitem}>
                        <Text style={styles.subtitle1}>{item}</Text>
                    </TouchableWithoutFeedback>
                );
            }
        });
    };
    const onShowUp = () => {
        popRef.show()
    }
    const onClosePopup = () => {
        popRef.close()
    }
    const _updateSections = activeSections => {
        setState({ activeSections });
    };

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
                <BottomPopup ref={(target) => { popRef = target }}
                    onTouchOutside={onClosePopup}
                />

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
        paddingBottom: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center'
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
    subtitle1: {
        fontSize: 20,
        fontWeight: '500',
        height: 40,
        backgroundColor: '#bff006',
        marginBottom: 10,

    }
});

export default MarkScreen