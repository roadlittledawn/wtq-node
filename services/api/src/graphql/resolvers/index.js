const deepAssign = require('deep-assign');
const etymology = require('./etymology');
const partOfSpeech = require('./part-of-speech');
const word = require('./word');
const phrase = require('./phrase');
const topic = require('./topic');
const quote = require('./quote');
const author = require('./author');
const context = require('./context');
const tone = require('./tone');

module.exports = deepAssign(
  etymology,
  partOfSpeech,
  word,
  phrase,
  topic,
  quote,
  author,
  context,
  tone,
);
