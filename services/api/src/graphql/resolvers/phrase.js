const Phrase = require('../../models/phrase');
const topic = require('../../models/topic');
const Tone = require('../../models/tone');

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
        slug,
        definition,
        note,
        topicIds,
        toneIds,
      } = input;
      return Phrase.create({
        name,
        slug,
        definition,
        note,
        topicIds,
        toneIds,
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
