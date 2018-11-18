const mongoose = require('../connections/db');
const schema = require('../schema/etymology');

module.exports = mongoose.model('etymology', schema, 'etymologies');
