import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import Layout from './grid/Layout';
import Link from 'next/link';
import { ButtonTwo } from './Button';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Container = styled.header`
  z-index: 1;
  position: fixed;
  width: 100%;
  background-color: #151515;
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

const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const Header = () => {
  const router = useRouter();
  const { data, client } = useQuery(IS_LOGGED_IN);

  const signOut = () => {
    localStorage.removeItem(`token`);
    client.resetStore();
    client.writeQuery({
      query: gql`
        query getAuth {
          isLoggedIn
        }
      `,
      data: {
        isLoggedIn: false,
      },
    });
    router.push(`/`);
  };

  return (
    <Container>
      <Layout>
        <NavItems>
          <Link href={`/`} passHref>
            <h1>notedly</h1>
          </Link>

          <BtnContainer>
            {data.isLoggedIn ? (
              <ButtonTwo onClick={signOut}>Sign Out</ButtonTwo>
            ) : (
              <>
                <Link href={`/auth/signin`} passHref>
                  <ButtonTwo>Sign in</ButtonTwo>
                </Link>

                <Link href={`/auth/signup`} passHref>
                  <ButtonTwo>Sign Up</ButtonTwo>
                </Link>
              </>
            )}
          </BtnContainer>
        </NavItems>
      </Layout>
    </Container>
  );
};

export default Header;
