const Etymology = require('../../models/etymology');

module.exports = {
  Query: {
    allEtymologies: () => Etymology.find(),
    etymology: (_, { input }) => {
      const { id } = input;
      return Etymology.findById(id);
    },
  },
  Mutation: {
    createEtymology: (_, { input }) => {
      const { name } = input;
      return Etymology.create({ name });
    },
    updateEtymology: async (_, { input }) => {
      const { id, payload } = input;
      const etymology = await Etymology.findById(id);
      etymology.set(payload);
      return etymology.save();
    },
    deleteEtymology: async (_, { input }) => {
      const { id } = input;
      await Etymology.remove({ _id: id });
      return true;
    },
  },
};
