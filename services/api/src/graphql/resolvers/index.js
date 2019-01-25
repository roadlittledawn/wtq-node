const deepAssign = require('deep-assign');
const etymology = require('./etymology');
const partOfSpeech = require('./part-of-speech');
const word = require('./word');
const phrase = require('./phrase');
const topic = require('./topic');

module.exports = deepAssign(
  etymology,
  partOfSpeech,
  word,
  {
    Query: {
      ping: () => 'pong',
    },
  },
  phrase,
  topic,
);
