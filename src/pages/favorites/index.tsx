import React from 'react';
import withAuth from 'utils/withAuth';
import { useQuery } from '@apollo/client';
import { Grid } from 'components/common/grid/Grid';
import { GET_MY_FAVORITES } from 'services/query';
import Note from 'components/common/Note';
import { Notes } from 'components/types/types';
import { Container } from 'components/common/Note';

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <Grid>
        <Container>
          {data.me.favorites.length !== 0 ? (
            data.me.favorites.map((note: Notes) => (
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

export default withAuth(Favorites);
