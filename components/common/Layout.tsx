import styled from 'styled-components';
const Container = styled.div``;

export const LayoutStyled = styled.main`
  max-width: 1400px;
  width: 100%;
  padding: 0rem 4rem;
  margin: 0 auto;
`;

const Layout = ({ children }: React.PropsWithChildren<Record<never, any>>) => {
  return (
    <LayoutStyled>
      <Container>{children}</Container>
    </LayoutStyled>
  );
};

export default Layout;
