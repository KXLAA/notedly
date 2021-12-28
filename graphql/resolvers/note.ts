import { NoteResolvers } from 'types/types';
const Note: NoteResolvers = {
  // Resolve the author info for a note when requested
  author: async (note, __, { models }) => {
    return await models.User.findById(note.author);
  },
  // Resolved the favoritedBy info for a note when requested
  favoritedBy: async (note, __, { models }) => {
    return await models.User.find({ _id: { $in: note.favoritedBy } });
  },
};

export default Note;
