const mongoose = require('../connections/db');
const schema = require('../schema/phrase');

module.exports = mongoose.model('phrase', schema, 'phrases');
