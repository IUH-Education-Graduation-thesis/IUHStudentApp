import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigation from './src/navigation/Rootnavigation';
import client from './src/core/apollo';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { GlobalProvider } from './src/contexts/GlobalContext';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <GlobalProvider>
            <NavigationContainer>
              <Rootnavigation />
            </NavigationContainer>
          </GlobalProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}
