import React from 'react';
import styled from 'styled-components';
import { format } from 'fecha';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { NoteProps } from 'components/types/types';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Note = styled.div`
  background-color: #151515;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #101010;
  padding: 24px;
  border-radius: 8px;
`;

const Dates = styled.p`
  font-size: 12px;
`;

const UserActions = styled.div`
  font-size: 20px;
`;

const LikeBtn = styled(FaRegHeart)`
  cursor: pointer;
`;

const Notes = ({ notes }: NoteProps) => {
  return (
    <Container>
      {notes.map(({ author, content, favoriteCount, createdAt, id }) => (
        <Note key={id}>
          <User>
            <Image
              src={author.avatar}
              width={50}
              height={50}
              alt={author.username}
            />
            <p>@{author.username}</p>
            <Dates> {format(new Date(createdAt), `DD MMM`)}</Dates>
          </User>

          <p>
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
          </p>
          <UserActions>
            <LikeBtn />
            <p>{favoriteCount}</p>
          </UserActions>
        </Note>
      ))}
    </Container>
  );
};

export default Notes;
