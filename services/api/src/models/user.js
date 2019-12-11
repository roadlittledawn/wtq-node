const mongoose = require('../connections/db');
const schema = require('../schema/user');

module.exports = mongoose.model('user', schema, 'users');
