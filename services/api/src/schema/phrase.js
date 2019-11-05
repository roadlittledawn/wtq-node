const { Schema } = require('mongoose');
const slug = require('slug');
const connection = require('../connections/db');

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
  source: {
    type: String,
    trim: true,
  },
  topicIds: [
    {
      type: Schema.Types.ObjectId,
      validate: {
        async validator(id) {
          const doc = await connection.model('topic').findById(id, { _id: 1 });
          if (doc) return true;
          return false;
        },
        message: 'No topic was found for ID {VALUE}',
      },
    },
  ],
  toneIds: [
    {
      type: Schema.Types.ObjectId,
      validate: {
        async validator(id) {
          const doc = await connection.model('tone').findById(id, { _id: 1 });
          if (doc) return true;
          return false;
        },
        message: 'No tone was found for ID {VALUE}',
      },
    },
  ],
  contextIds: [
    {
      type: Schema.Types.ObjectId,
      validate: {
        async validator(id) {
          const doc = await connection.model('context').findById(id, { _id: 1 });
          if (doc) return true;
          return false;
        },
        message: 'No contexts were found for ID {VALUE}',
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = schema;
