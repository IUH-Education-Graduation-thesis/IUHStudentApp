import React, { Component } from 'react'
import { TextInput as RNInput, StyleSheet, View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
// import { COLORS } from '../../themes/style';
import Text from '../Text'
import { COLORS } from '../../themes/color'
export const fontIcon = {
    fontisto: "Fontisto",
    evilIcons: "EvilIcons",
    antDesign: 'AntDesign',
    feather: 'Feather',
    entypo: 'Entypo'
}
export default class TextInput extends Component {
    state = {
        focusInput: false,
    }
    render() {
        const { errorText, placeholder, style } = this.props;

        return (
            < >
                <View style={[styles.container, errorText && styles.styleError,]}>
                    <RNInput {...this.props}
                        style={[styles.styleTextInput,
                        this.state.focusInput && styles.styleFocus, style]}
                        placeholder={placeholder}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    {!!errorText && <Text>{errorText}</Text>}
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        width: '90%',
        marginBottom: 10
    },
    styleTextInput: {
        width: '80%',
        height: 50,
        marginHorizontal: 10,
        // fontStyle: 'italic'
    },
    styleError: { borderColor: 'red', borderWidth: 1 },
    styleFocus: { borderColor: 'green', borderWidth: 1 }
})
