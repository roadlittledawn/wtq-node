const Word = require('../../models/word');
const PartOfSpeech = require('../../models/part-of-speech');
const Etymology = require('../../models/etymology');
const Context = require('../../models/context');
const Tone = require('../../models/tone');


module.exports = {
  Word: {
    partsOfSpeech: async (word) => {
      const parts = await PartOfSpeech.find({ _id: { $in: word.partOfSpeechIds } }) || [];
      return parts;
    },
    etymologies: async (word) => {
      const parts = await Etymology.find({ _id: { $in: word.etymologyIds } }) || [];
      return parts;
    },
    contexts: async (word) => {
      const parts = await Context.find({ _id: { $in: word.contextIds } }) || [];
      return parts;
    },
    tones: async (word) => {
      const parts = await Tone.find({ _id: { $in: word.toneIds } }) || [];
      return parts;
    },
  },

  Query: {
    allWords: () => Word.find(),
    word: (_, { input }) => {
      const { id } = input;
      return Word.findById(id);
    },
    wordBySlug: (_, { input }) => {
      const { slug } = input;
      return Word.findOne({ slug });
    },
    wordsByCategory: (_, { input }) => {
      const { fieldName, id } = input;
      return Word.find({ [fieldName]: id });
    },
  },
  Mutation: {
    createWord: (_, { input }) => {
      const {
        name,
        definition,
        slug,
        note,
        partOfSpeechIds,
        etymologyIds,
        contextIds,
        toneIds,
      } = input;
      return Word.create({
        name,
        definition,
        slug,
        note,
        partOfSpeechIds,
        etymologyIds,
        contextIds,
        toneIds,
      });
    },
    updateWord: async (_, { input }) => {
      const { id, payload } = input;
      const word = await Word.findById(id);
      word.set(payload);
      return word.save();
    },
    deleteWord: async (_, { input }) => {
      const { id } = input;
      await Word.remove({ _id: id });
      return true;
    },
  },
};
