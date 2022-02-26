import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../themes/color'
import { SafeAreaView } from 'react-native-safe-area-context';

const BackgroundView = (props) => {
    const { style } = props;
    return (
        <SafeAreaView style={[styles.container, style]}>
            <View style={styles.container}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightBlue
    }
})
export default BackgroundView