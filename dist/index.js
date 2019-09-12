"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireDefault(require("../models"));

var fs = _interopRequireWildcard(require("fs"));

var https = _interopRequireWildcard(require("https"));

var http = _interopRequireWildcard(require("http"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { ApolloServer } = require('apollo-server')
// const typeDefs = require('./schema')
// const resolvers = require('./resolvers')
// const models = require('../models')
// const apollo = new ApolloServer({typeDefs, resolvers});
const apollo = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  context: {
    models: _models.default
  }
});
const app = (0, _express.default)();
apollo.applyMiddleware({
  app
});
const server = https.createServer({
  cert: fs.readFileSync('/mnt/c/Users/SS110138.CAD/Desktop/cert_cad-corp-root-ca.crt')
}, app);
apollo.installSubscriptionHandlers(server);
server.listen({
  port: 4000
}, () => console.log('server listening on port 4000'));