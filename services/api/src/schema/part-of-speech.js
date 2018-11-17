const { Schema } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = schema;
