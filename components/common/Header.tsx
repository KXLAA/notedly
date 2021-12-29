import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import Link from 'next/link';

const Container = styled.header`
  border-bottom: solid 2px #181818;
  padding: 1.5rem 0rem;
  /* -webkit-box-shadow: 3px 4px 15px -8px rgba(0, 0, 0, 0.71);
  box-shadow: 3px 4px 15px -8px rgba(0, 0, 0, 0.71); */

  h1 {
    font-size: 3rem;
    font-weight: 900;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <Container>
      <Layout>
        <Link href={`/`} passHref>
          <h1>Notedly</h1>
        </Link>
      </Layout>
    </Container>
  );
};

export default Header;