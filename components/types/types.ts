interface Author {
  avatar: string;
  id: string;
  username: string;
}

export interface Notes {
  author: Author;
  content: string;
  createdAt: string;
  favoriteCount: number;
  id: string;
}

export interface NoteProps {
  notes: Notes[];
}
