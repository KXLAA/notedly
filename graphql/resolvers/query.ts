import { QueryResolvers } from 'types/types';

const Query: QueryResolvers = {
  notes: async (_, __, { models }) => {
    return await models.Note.find({});
  },
  note: async (_, args, { models }) => {
    return await models.Note.findById(args.id);
  },
  user: async (_, { username }, { models }) => {
    // find a user given their username
    return await models.User.findOne({ username });
  },
  users: async (_, _args, { models }) => {
    // find all users
    return await await models.User.find({});
  },
  me: async (_, _args, { models, user }) => {
    // find a user given the current user context
    return await models.User.findById(user.id);
  },
};

export default Query;
