const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('../graphql/schema');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

const router = Router();

const server = new ApolloServer({
  schema,
  playground: !isProduction ? { endpoint: '/graphql' } : false,
});
server.applyMiddleware({ app: router, path: '/' });

module.exports = router;
