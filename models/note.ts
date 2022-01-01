import mongoose from 'mongoose';
// Define the note's database schema
const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },
    //Array of users who favorited
    favoriteCount: { type: Number, default: 0 },
    //Array of users who favorited
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
  },
  { timestamps: true },
);

NoteSchema.set(`toJSON`, {
  transform: (document, returnedObject) => {
    const object = returnedObject;
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

// Define the 'Note' model with the schema
const Note = mongoose.models.Note || mongoose.model(`Note`, NoteSchema);

export default Note;
