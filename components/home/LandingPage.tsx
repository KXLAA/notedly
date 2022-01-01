import React, { useState } from 'react';
import { GridItemSide, GridItemMain, Grid } from './Layout';
import styled from 'styled-components';
import Link from 'next/link';
import { ButtonOne } from 'components/common/Button';
import Notes from './Notes';
import { NoteProps } from 'components/types/types';
import Layout from 'components/common/Layout';
import NewNote from './NewNote';
import EditNote from './EditNote';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-right: 24px;
  gap: 32px;
  justify-content: center;

  a {
    font-size: 2rem;
    transition: all 0.3s ease;
    font-weight: 600;

    &:hover {
      background: #222222;
      border-radius: 24px;
      width: fit-content;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const LandingPage = ({ notes }: NoteProps) => {
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleNewNote = () => {
    setShowNew(!showNew);
  };

  const toggleEditNote = () => {
    setShowEdit(!showEdit);
  };

  return (
    <Layout>
      <Grid>
        <GridItemSide>
          <Nav>
            <Link href={`/`}>
              <a>🏚 Home</a>
            </Link>

            <Link href={`/mynotes`}>
              <a>📕 My Notes</a>
            </Link>

            <Link href={`/favorites`}>
              <a>💖 Favorites</a>
            </Link>

            <ButtonOne onClick={toggleNewNote}>Add Note</ButtonOne>
          </Nav>
        </GridItemSide>
        <GridItemMain>
          <Main>
            {showEdit && (
              <EditNote
                toggleEditNote={toggleEditNote}
                toggleNewNote={toggleNewNote}
              />
            )}
            {showNew && (
              <NewNote
                toggleNewNote={toggleNewNote}
                toggleEditNote={toggleEditNote}
              />
            )}
            <Notes notes={notes} />
          </Main>
        </GridItemMain>
      </Grid>
    </Layout>
  );
};

export default LandingPage;
