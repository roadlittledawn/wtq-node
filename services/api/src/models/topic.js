const mongoose = require('../connections/db');
const schema = require('../schema/topic');

module.exports = mongoose.model('topic', schema, 'topics');
