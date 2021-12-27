import { QueryResolvers } from '../../types/types';

const Query: QueryResolvers = {
  notes: async (_, __, { models }) => {
    return await models.Note.find({});
  },
  note: async (_, args, { models }) => {
    return await models.Note.findById(args.id);
  },
};

export default Query;
