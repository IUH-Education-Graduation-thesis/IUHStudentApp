import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import config from '../config';
import { createHttpLink } from '@apollo/client/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from 'apollo-link-ws';

const getAccessToken = async () => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('@token');
  return token;
};

const httpLink = createHttpLink({
  uri: config.GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: config.GRAPHQL_URL_SUBSCRIPTION,
  options: {
    reconnect: true,
    lazy: true,
  },
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getAccessToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  // eslint-disable-next-line
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, terminatingLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
