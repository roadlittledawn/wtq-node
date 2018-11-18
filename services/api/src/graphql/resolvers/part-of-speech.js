const PartOfSpeech = require('../../models/part-of-speech');

module.exports = {
  Query: {
    allPartsOfSpeech: () => PartOfSpeech.find(),
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
    updatePartOfSpeech: async (_, { input }) => {
      const { id, payload } = input;
      const partOfSpeech = await PartOfSpeech.findById(id);
      partOfSpeech.set(payload);
      return partOfSpeech.save();
    },
    deletePartOfSpeech: async (_, { input }) => {
      const { id } = input;
      await PartOfSpeech.remove({ _id: id });
      return true;
    },
  },
};
