const mongoose = require('../connections/db');
const schema = require('../schema/part-of-speech');

module.exports = mongoose.model('function', schema);
