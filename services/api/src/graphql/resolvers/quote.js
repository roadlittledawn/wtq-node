const Quote = require('../../models/quote');
const topic = require('../../models/topic');
const author = require('../../models/author');

module.exports = {
  Quote: {
    topics: async (quote) => {
      const parts = await topic.find({ _id: { $in: quote.topicIds } }) || [];
      return parts;
    },
    author: async (quote) => {
      const parts = await author.findById(quote.authorId) || '';
      return parts;
    },
  },

  Query: {
    allQuotes: () => Quote.find(),
    quote: (_, { input }) => {
      const { id } = input;
      return Quote.findById(id);
    },
    quoteBySlug: (_, { input }) => {
      const { slug } = input;
      return Quote.findOne({ slug });
    },
  },
  Mutation: {
    createQuote: (_, { input }) => {
      const {
        name,
        slug,
        body,
        authorId,
        note,
        topicIds,
      } = input;
      return Quote.create({
        name,
        slug,
        body,
        authorId,
        note,
        topicIds,
      });
    },
    updateQuote: async (_, { input }) => {
      const { id, payload } = input;
      const quote = await Quote.findById(id);
      quote.set(payload);
      return quote.save();
    },
    deleteQuote: async (_, { input }) => {
      const { id } = input;
      await Quote.remove({ _id: id });
      return true;
    },
  },
};
