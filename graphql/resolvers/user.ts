import { UserResolvers } from 'types/types';

const User: UserResolvers = {
  // Resolve the list of notes for a user when requested
  notes: async (user, args, { models }) => {
    return await models.Note.find({ author: user.id }).sort({ _id: -1 });
  },

  // Resolve the list of favorites for a user when requested
  favorites: async (user, args, { models }) => {
    return await models.Note.find({ favoritedBy: user.id }).sort({ _id: -1 });
  },
};

export default User;
