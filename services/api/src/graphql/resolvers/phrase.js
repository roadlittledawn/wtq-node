const Phrase = require('../../models/phrase');
// const PartOfSpeech = require('../../models/part-of-speech');

module.exports = {
  Phrase: {
    // partsOfSpeech: async (word) => {
    //   const parts = await PartOfSpeech.find({ _id: { $in: word.partOfSpeechIds } }) || [];
    //   return parts;
    // },
  },

  Query: {
    allPhrases: () => Phrase.find(),
    phrase: (_, { input }) => {
      const { id } = input;
      return Phrase.findById(id);
    },
    phraseBySlug: (_, { input }) => {
      const { slug } = input;
      return Phrase.findOne({ slug });
    },
  },
  Mutation: {
    createPhrase: (_, { input }) => {
      const {
        name,
        definition,
        note,
        // partOfSpeechIds,
      } = input;
      return Phrase.create({
        name,
        definition,
        note,
        // partOfSpeechIds,
      });
    },
    updatePhrase: async (_, { input }) => {
      const { id, payload } = input;
      const phrase = await Phrase.findById(id);
      phrase.set(payload);
      return phrase.save();
    },
    deletePhrase: async (_, { input }) => {
      const { id } = input;
      await Phrase.remove({ _id: id });
      return true;
    },
  },
};
