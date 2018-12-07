const mongoose = require('mongoose');

const { MONGO_DSN } = process.env;

const connection = mongoose.createConnection(MONGO_DSN, {
  ignoreUndefined: true,
  useNewUrlParser: true,
});

module.exports = connection;
