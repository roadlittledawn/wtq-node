const mongoose = require('../connections/db');
const schema = require('../schema/context');

module.exports = mongoose.model('context', schema, 'contexts');
