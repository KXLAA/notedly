import styled from 'styled-components';

const LayoutStyled = styled.main`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-areas: 'side main';
  align-items: start;
`;

const SideContainer = styled.div`
  grid-area: side;
  border-right: solid 2px #181818;
  height: 100%;
`;

const MainContainer = styled.div`
  grid-area: main;
`;

export const Grid = ({
  children,
}: React.PropsWithChildren<Record<never, any>>) => {
  return <LayoutStyled>{children}</LayoutStyled>;
};

export const GridItemSide = ({
  children,
}: React.PropsWithChildren<Record<never, any>>) => {
  return <SideContainer>{children}</SideContainer>;
};

export const GridItemMain = ({
  children,
}: React.PropsWithChildren<Record<never, any>>) => {
  return <MainContainer>{children}</MainContainer>;
};
