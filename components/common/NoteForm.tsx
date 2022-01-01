import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonOne } from 'components/common/Button';
import { Grid } from 'components/common/grid/Grid';

const Form = styled.form`
  padding: 24px;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Button = styled(ButtonOne)`
  width: fit-content;
  align-self: flex-end;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 8px;
  background-color: #151515;
  border: solid 4px #181818;
  padding: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  resize: none;
  height: 500px;
  color: white;
  background-color: #151515;
  border: solid 4px #181818;
  padding: 1rem;
  border-radius: 0.5rem;
`;

interface NoteFormProps {
  note?: {
    content: string;
    title: string;
  };
  action: (variables: { [x: string]: any }) => void;
}

const NoteForm = ({ note, action }: NoteFormProps) => {
  const [value, setValue] = useState({
    content: note?.content || ``,
    title: note?.title || ``,
  });

  const onChange = (event: { target: { name: string; value: string } }) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          action({
            variables: {
              content: value.content,
              title: value.title,
            },
          });
        }}
      >
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={value.title}
          onChange={onChange}
        />
        <TextArea
          required
          name="content"
          placeholder="Note Content"
          value={value.content}
          onChange={onChange}
        />
        <Button>Save</Button>
      </Form>
    </Grid>
  );
};

export default NoteForm;
