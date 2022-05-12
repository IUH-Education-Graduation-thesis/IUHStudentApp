const config = {
  IS_LOCAL: process.env.NODE_ENV === 'dev',
  IS_PROD: process.env.NODE_ENV === 'prod',
  PORT: 6969,
  HOST_ADDRESS: '52.77.233.218',
};

// config.GRAPHQL_URL = `http://52.77.233.218/graphql`;
// config.GRAPHQL_URL_SUBSCRIPTION = `ws://52.77.233.218/subscriptions`;
config.GRAPHQL_URL_SUBSCRIPTION = `ws://localhost:8080/subscriptions`;

config.GRAPHQL_URL = 'http://localhost:8080/graphql';

module.exports = config;
