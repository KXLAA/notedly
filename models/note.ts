import mongoose from 'mongoose';
// Define the note's database schema
const NoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Define the 'Note' model with the schema
const Note = mongoose.models.Note || mongoose.model(`Note`, NoteSchema);

export default Note;
