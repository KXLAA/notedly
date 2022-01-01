import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Note } from 'components/types/types';
import { GET_ME } from 'services/query';

const NoteUser = ({ note }: Note) => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      {data.me.id === note.author.id && (
        <Link href={`/edit/${note.id}`}>Edit</Link>
      )}
    </>
  );
};
export default NoteUser;
