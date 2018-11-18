const deepAssign = require('deep-assign');
const etymology = require('./etymology');
const partOfSpeech = require('./part-of-speech');

module.exports = deepAssign(
  etymology,
  partOfSpeech,
  {
    Query: {
      ping: () => 'pong',
    },
  },
);
