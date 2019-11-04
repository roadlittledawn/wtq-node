const mongoose = require('../connections/db');
const schema = require('../schema/quote');

module.exports = mongoose.model('quote', schema, 'quotes');
