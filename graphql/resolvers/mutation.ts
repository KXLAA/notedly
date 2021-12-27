import { MutationResolvers } from '../../types/types';

const Mutation: MutationResolvers = {
  newNote: async (_, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: `Adam Scott`,
    });
  },

  deleteNote: async (_, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  },

  updateNote: async (_, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      },
    );
  },
};

export default Mutation;
