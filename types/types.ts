export interface NoteArgs {
  id: string;
}

export interface NewNoteArgs {
  content: string;
  author: string;
}

export interface Note {
  content: Note;
}

export interface NoteSchema {
  models: Note;
}
