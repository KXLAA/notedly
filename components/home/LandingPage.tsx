import Layout from 'components/common/Layout';
import React from 'react';
import { GridItemSide, GridItemMain, Grid } from './Layout';
import styled from 'styled-components';
import Link from 'next/link';
import { ButtonOne } from 'components/common/Button';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-right: 24px;
  gap: 24px;
  justify-content: center;

  a {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const LandingPage = () => {
  return (
    <Layout>
      <Grid>
        <GridItemSide>
          <Nav>
            <Link href={`/`}>
              <a>🏚 Home</a>
            </Link>

            <Link href={`/`}>
              <a>📒 My Notes</a>
            </Link>

            <Link href={`/`}>
              <a>💖 Favorites</a>
            </Link>

            <ButtonOne>Add Note</ButtonOne>
          </Nav>
        </GridItemSide>
        <GridItemMain>
          <Main>
            <h1>This is the main Content</h1>
            <h1>Test</h1>
            <h1>Test</h1>
          </Main>
        </GridItemMain>
      </Grid>
    </Layout>
  );
};

export default LandingPage;
