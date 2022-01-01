import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import { ButtonOne } from '../Button';

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

const SideBar = () => {
  return (
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

      <Link passHref href={`/new`}>
        <ButtonOne>Add Note</ButtonOne>
      </Link>
    </Nav>
  );
};

export default SideBar;
