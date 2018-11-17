const { Schema } = require('mongoose');

const schema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
});

module.exports = schema;
