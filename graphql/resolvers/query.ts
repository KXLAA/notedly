import { NoteArgs } from 'types/types';

const Query = {
  notes: async (_, __, { models }) => {
    return await models.Note.find({});
  },
  note: async (_, args: NoteArgs, { models }) => {
    return await models.Note.findById(args.id);
  },
};

export default Query;
