import React from 'react';
import NoteForm from 'components/common/NoteForm';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { NEW_NOTE } from 'services/mutation';
import { GET_NOTES, GET_MY_NOTES } from 'services/query';

const NewNote = () => {
  const router = useRouter();
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // refetch the GET_NOTES query to update the cache
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: (data) => {
      // when complete, redirect the user to the note page
      router.push(`note/${data.newNote.id}`);
    },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />;
    </>
  );
};

export default NewNote;
