const PartOfSpeech = require('../../models/part-of-speech');

module.exports = {
  Query: {
    partOfSpeech: (_, { input }) => {
      const { id } = input;
      return PartOfSpeech.findById(id);
    },
  },
  Mutation: {
    createPartOfSpeech: (_, { input }) => {
      const { name } = input;
      return PartOfSpeech.create({ name });
    },
  },
};
