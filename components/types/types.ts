import { Dispatch, SetStateAction } from 'react';

interface Author {
  avatar: string;
  id: string;
  username: string;
}

export interface Notes {
  author: Author;
  title: string;
  content: string;
  createdAt: string;
  favoriteCount: number;
  id: string;
}

export interface NotesProps {
  notes?: Notes[];
  setNoteId?: Dispatch<SetStateAction<string>>;
}

export interface Note {
  note: {
    author: Author;
    title: string;
    content: string;
    createdAt: string;
    favoriteCount: number;
    id: string;
  };
}
