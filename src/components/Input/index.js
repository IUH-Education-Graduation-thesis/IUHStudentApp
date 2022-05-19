import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../themes/color';
import Text from '../Text';
const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => { },
    ...props
}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={style.label}>{label}</Text>
            <View
                style={[
                    style.inputContainer,
                    {
                        borderColor: error
                            ? COLORS.red
                            : isFocused
                                ? COLORS.darkBlue
                                : COLORS.light,
                        alignItems: 'center',
                    },
                ]}>
                {/* <Icon
                    name={iconName}
                    style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
                /> */}
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    placeholderTextColor='gray'
                    style={{ color: 'black', width: '80%' }}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={{ color: 'black', fontSize: 22, }}
                    />
                )}
            </View>
            {error && (
                <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 20,
        color: COLORS.black,
    },
    inputContainer: {
        height: 55,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 3
    },
});

export default Input;