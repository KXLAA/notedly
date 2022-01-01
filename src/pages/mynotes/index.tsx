import React from 'react';
import withAuth from 'utils/withAuth';
import { useQuery } from '@apollo/client';
import { GET_MY_NOTES } from 'services/query';
import { Grid } from 'components/common/grid/Grid';
import Note from 'components/common/Note';
import { Notes } from 'components/types/types';
import { Container } from 'components/common/Note';

const MyNotes = () => {
  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <Grid>
        <Container>
          {data.me.notes.length !== 0 ? (
            data.me.notes.map((note: Notes) => (
              <Note key={note.id} note={note} />
            ))
          ) : (
            <p>No favorites yet</p>
          )}
        </Container>
      </Grid>
    </>
  );
};

export default withAuth(MyNotes);
