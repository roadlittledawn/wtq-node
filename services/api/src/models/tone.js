const mongoose = require('../connections/db');
const schema = require('../schema/tone');

module.exports = mongoose.model('tone', schema, 'tones');
