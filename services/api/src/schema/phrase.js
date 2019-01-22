const { Schema } = require('mongoose');
const slug = require('slug');
// const connection = require('../connections/db');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    set(v) {
      if (v) return slug(v);
      return slug(this.name);
    },
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
  // partOfSpeechIds: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     validate: {
  //       async validator(id) {
  //         const doc = await connection.model('part-of-speech').findById(id, { _id: 1 });
  //         if (doc) return true;
  //         return false;
  //       },
  //       message: 'No part of speech was found for ID {VALUE}',
  //     },
  //   },
  // ],
}, {
  timestamps: true,
});

module.exports = schema;
