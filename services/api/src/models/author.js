const mongoose = require('../connections/db');
const schema = require('../schema/author');

module.exports = mongoose.model('author', schema, 'authors');
