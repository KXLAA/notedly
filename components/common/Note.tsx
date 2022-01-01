/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { format } from 'fecha';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { Note } from 'components/types/types';
import NoteUser from './NoteUser';
import { IS_LOGGED_IN } from 'services/query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 24px;
  padding-right: 0;
`;

const NoteContainer = styled.div`
  background-color: #151515;
  padding: 1rem;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 150px 1fr 80px;
  grid-template-areas: 'side main actions';
  gap: 1.5rem;

  p {
    font-size: 1.3rem;
  }
`;

const User = styled.div`
  align-self: start;
  grid-area: side;
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
  grid-area: actions;
  flex-direction: column;
  align-self: start;
  font-size: 40px;
  display: flex;
  align-items: center;
  gap: 24px;

  p {
    font-size: 24px;
  }
`;

const LikeBtn = styled(FaRegHeart)`
  cursor: pointer;
`;

const Content = styled.div`
  grid-area: main;
`;

const Note = ({ note }: Note) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  const { author, content, favoriteCount, createdAt, title } = note;
  return (
    <NoteContainer>
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

      <Content>
        <h1>{title}</h1>
        <p>
          {content} {content}
          {content} {content}
        </p>
      </Content>

      <UserActions>
        <LikeBtn />
        <p>{favoriteCount}</p>
        {data.isLoggedIn && <NoteUser note={note} />}
      </UserActions>
    </NoteContainer>
  );
};

export default Note;
