const Topic = require('../../models/topic');

module.exports = {
  Query: {
    allTopics: () => Topic.find(),
    topic: (_, { input }) => {
      const { id } = input;
      return Topic.findById(id);
    },
  },
  Mutation: {
    createTopic: (_, { input }) => {
      const { name } = input;
      return Topic.create({ name });
    },
    updateTopic: async (_, { input }) => {
      const { id, payload } = input;
      const topic = await Topic.findById(id);
      topic.set(payload);
      return topic.save();
    },
    deleteTopic: async (_, { input }) => {
      const { id } = input;
      await Topic.remove({ _id: id });
      return true;
    },
  },
};
