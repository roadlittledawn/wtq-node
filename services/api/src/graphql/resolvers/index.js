const deepAssign = require('deep-assign');
const etymology = require('./etymology');
const partOfSpeech = require('./part-of-speech');
const word = require('./word');

module.exports = deepAssign(
  etymology,
  partOfSpeech,
  word,
  {
    Query: {
      ping: () => 'pong',
    },
  },
);
