import React from 'react';
import { GridItemSide, GridItemMain, Grid } from './Layout';
import styled from 'styled-components';
import Link from 'next/link';
import { ButtonOne } from 'components/common/Button';
import Notes from './Notes';

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

const LandingPage = ({ notes }) => {
  return (
    <>
      <Grid>
        <GridItemSide>
          <Nav>
            <Link href={`/`}>
              <a>🏚 Home</a>
            </Link>

            <Link href={`/`}>
              <a>📕 My Notes</a>
            </Link>

            <Link href={`/`}>
              <a>💖 Favorites</a>
            </Link>

            <ButtonOne>Add Note</ButtonOne>
          </Nav>
        </GridItemSide>
        <GridItemMain>
          <Main>
            <Notes notes={notes} />
          </Main>
        </GridItemMain>
      </Grid>
    </>
  );
};

export default LandingPage;
