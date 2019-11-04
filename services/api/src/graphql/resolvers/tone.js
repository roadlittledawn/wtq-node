const Tone = require('../../models/tone');

module.exports = {
  Query: {
    allTones: () => Tone.find(),
    tone: (_, { input }) => {
      const { id } = input;
      return Tone.findById(id);
    },
  },
  Mutation: {
    createTone: (_, { input }) => {
      const { name } = input;
      return Tone.create({ name });
    },
    updateTone: async (_, { input }) => {
      const { id, payload } = input;
      const tone = await Tone.findById(id);
      tone.set(payload);
      return tone.save();
    },
    deleteTone: async (_, { input }) => {
      const { id } = input;
      await Tone.remove({ _id: id });
      return true;
    },
  },
};
