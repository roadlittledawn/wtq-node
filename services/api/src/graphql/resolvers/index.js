const deepAssign = require('deep-assign');
const partOfSpeech = require('./part-of-speech');


module.exports = deepAssign(
  partOfSpeech,
  {
    Query: {
      ping: () => 'pong',
    },
  },
);
