const PartOfSpeech = require('../../models/part-of-speech');

module.exports = {
  Mutation: {
    createPartOfSpeech: (_, { input }) => {
      const { name } = input;
      return PartOfSpeech.create({ name });
    },
  },
};
