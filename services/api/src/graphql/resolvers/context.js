const Context = require('../../models/context');

module.exports = {
  Query: {
    allContexts: () => Context.find(),
    context: (_, { input }) => {
      const { id } = input;
      return Context.findById(id);
    },
  },
  Mutation: {
    createContext: (_, { input }) => {
      const { name } = input;
      return Context.create({ name });
    },
    updateContext: async (_, { input }) => {
      const { id, payload } = input;
      const context = await Context.findById(id);
      context.set(payload);
      return context.save();
    },
    deleteContext: async (_, { input }) => {
      const { id } = input;
      await Context.remove({ _id: id });
      return true;
    },
  },
};
