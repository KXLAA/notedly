import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import withAuth from 'utils/withAuth';

import { GET_NOTE, GET_ME } from 'services/query';
import { EDIT_NOTE } from 'services/mutation';
import NoteForm from 'components/common/NoteForm';

const EditNote = () => {
  const router = useRouter();
  const { editId } = router.query;
  console.log(editId);

  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id: editId },
  });

  console.log(data);

  const { data: userdata } = useQuery(GET_ME);

  console.log(userdata);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id: editId,
    },
    onCompleted: () => {
      router.push(`/note/${editId}`);
    },
  });

  if (loading) return `Loading...`;

  if (error) return <p>Error! Note not found</p>;

  if (userdata?.me.id !== data?.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }

  return (
    <>
      <NoteForm note={data.note} action={editNote} />;
    </>
  );
};

export default withAuth(EditNote);
