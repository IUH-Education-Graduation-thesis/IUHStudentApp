import React, { Component } from 'react'
import { Text as RNText } from 'react-native'

export default class Text extends Component {
    render() {
        const { style } = this.props;
        return (
            <RNText style={[{ color: 'black' }, style]}> {this.props.children} </RNText>
        )
    }
}
