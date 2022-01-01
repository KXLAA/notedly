import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_NOTE } from 'services/query';
import Note, { Container } from 'components/common/Note';

const OneNote = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id: id },
  });
  console.log(data);

  return (
    <Container>
      <Note note={data?.note} />
    </Container>
  );
};

export default OneNote;
