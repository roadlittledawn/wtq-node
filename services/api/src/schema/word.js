const { Schema } = require('mongoose');
const connection = require('../connections/db');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  definition: {
    type: String,
    required: true,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
  functionIds: [
    {
      type: '',
      validate: {
        async validator(id) {
          const doc = await connection.model('part-of-speech').findById(id, { _id: 1 });
          if (doc) return true;
          return false;
        },
        message: 'No part of speech was found for ID {VALUE}',
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = schema;
