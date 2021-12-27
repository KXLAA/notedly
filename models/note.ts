import mongoose from 'mongoose';
// Define the note's database schema
const noteSchema = new mongoose.Schema(
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
const Note = mongoose.models.Note || mongoose.model(`Note`, noteSchema);

export default Note;
