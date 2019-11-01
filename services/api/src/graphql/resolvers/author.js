const Author = require('../../models/author');

module.exports = {
  Query: {
    allAuthors: () => Author.find(),
    author: (_, { input }) => {
      const { id } = input;
      return Author.findById(id);
    },
  },
  Mutation: {
    createAuthor: (_, { input }) => {
      const { name } = input;
      return Author.create({ name });
    },
    updateAuthor: async (_, { input }) => {
      const { id, payload } = input;
      const author = await Author.findById(id);
      author.set(payload);
      return author.save();
    },
    deleteAuthor: async (_, { input }) => {
      const { id } = input;
      await Author.remove({ _id: id });
      return true;
    },
  },
};
