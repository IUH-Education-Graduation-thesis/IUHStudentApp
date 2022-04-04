import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native'
import Rootnavigation from './src/navigation/Rootnavigation'
import client from './src/core/apollo'

export default class App extends Component {
  render() {
    return (
      <ApolloClient client={client}>
        <Provider store={store}>
          <NavigationContainer>
            <Rootnavigation />
          </NavigationContainer>
        </Provider>
      </ApolloClient>
    )
  }
}