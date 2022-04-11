const config = {
  IS_LOCAL: process.env.NODE_ENV === 'dev',
  IS_PROD: process.env.NODE_ENV === 'prod',
  PORT: 6969,
  HOST_ADDRESS: "http://52.77.233.218",
};

// config.GRAPHQL_URL = `${config.HOST_ADDRESS}/graphql`;

config.GRAPHQL_URL = 'http://127.0.0.1:8080/graphql';

module.exports = config;
