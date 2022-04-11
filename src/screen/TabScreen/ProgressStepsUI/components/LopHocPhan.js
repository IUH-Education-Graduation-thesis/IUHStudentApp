import { Image, ScrollView, View, } from 'react-native'
import React, { useState } from 'react'
import Text from '../../../../components/Text';
import Accordion from "react-native-collapsible/Accordion";
import { IC_ARR_DOWN } from '../../MarkScreen/icons';
import { getListMonHocSelectors } from '../../../../redux/selectors/selectorStudents';
import { useSelector } from 'react-redux';
const LopHocPhan = (props) => {
    const { ctLop } = props;
    const idsMonHoc = useSelector(getListMonHocSelectors);
    console.log(idsMonHoc);
    const [state, setState] = useState({
        activeSections: [],
    });
    const _renderHeader = section => (
        <View key={section} style={styles.item} >
            <Text style={styles.title}>{section.tenMon + " - " + section.mahp}</Text>
            <Image source={IC_ARR_DOWN} />
        </View>
    );
    const _updateSections = activeSections => {
        setState({ activeSections });
    };
    const _renderContent = section => {
        return (
            <View style={styles.subitem}>
                <Text style={styles.subtitle1}>{section.tenMon + " - " + section.lopDuKien + " - " + section.mahp}</Text>
            </View>
        );

    };

    return (
        <ScrollView>
            <Accordion
                sections={ctLop}
                activeSections={state.activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
            />
        </ScrollView>
    )
}

export default LopHocPhan