import React from 'react';
import { NotesProps } from 'components/types/types';
import Note from 'components/common/Note';
import { Container } from 'components/common/Note';

const LandingPage = ({ notes }: NotesProps) => {
  return (
    <Container>
      {notes?.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </Container>
  );
};

export default LandingPage;
