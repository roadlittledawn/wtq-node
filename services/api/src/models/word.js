const mongoose = require('../connections/db');
const schema = require('../schema/word');

module.exports = mongoose.model('word', schema, 'words');
