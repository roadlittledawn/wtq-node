const Phrase = require('../../models/phrase');
const topic = require('../../models/topic');
const Tone = require('../../models/tone');
const Context = require('../../models/context');

module.exports = {
  Phrase: {
    topics: async (phrase) => {
      const parts = await topic.find({ _id: { $in: phrase.topicIds } }) || [];
      return parts;
    },
    tones: async (phrase) => {
      const parts = await Tone.find({ _id: { $in: phrase.toneIds } }) || [];
      return parts;
    },
    contexts: async (phrase) => {
      const parts = await Context.find({ _id: { $in: phrase.contextIds } }) || [];
      return parts;
    },
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
    phrasesByCategory: (_, { input }) => {
      const { fieldName, id } = input;
      return Phrase.find({ [fieldName]: id });
    },
  },
  Mutation: {
    createPhrase: (_, { input }) => {
      const {
        name,
        slug,
        definition,
        note,
        topicIds,
        toneIds,
        contextIds,
        source,
      } = input;
      return Phrase.create({
        name,
        slug,
        definition,
        note,
        topicIds,
        toneIds,
        contextIds,
        source,
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
