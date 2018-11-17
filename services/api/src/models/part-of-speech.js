const mongoose = require('../connections/db');
const schema = require('../schema/function');

module.exports = mongoose.model('function', schema);
