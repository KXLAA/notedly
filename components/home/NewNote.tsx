import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { ButtonOne } from '../common/Button';
import { GET_NOTES, GET_MY_NOTES } from 'services/query';
import { NEW_NOTE } from 'services/mutation';

const Form = styled.form`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
`;

const Button = styled(ButtonOne)`
  width: fit-content;
  align-self: flex-end;
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  resize: none;
  height: 200px;
  color: white;
  background-color: #151515;
  border: solid 4px #181818;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 16px;
`;

interface NewNoteProps {
  toggleEditNote(): void;
  toggleNewNote(): void;
}

const NewNote = ({ toggleNewNote, toggleEditNote }: NewNoteProps) => {
  const [value, setValue] = useState({ content: `` });
  const [newNote, { loading, error }] = useMutation(NEW_NOTE, {
    // refetch the GET_NOTES query to update the cache
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: (data) => {
      toggleNewNote();
      console.log(data.newNote);
    },
  });

  const onChange = (event: { target: { name: string; value: string } }) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        newNote({
          variables: {
            ...value,
          },
        });
      }}
    >
      <TextArea
        required
        type="text"
        name="content"
        placeholder="Note content"
        value={value.content}
        onChange={onChange}
      />
      <Button>Save</Button>
    </Form>
  );
};

export default NewNote;
