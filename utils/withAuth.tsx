/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== `undefined`) {
      const Router = useRouter();
      const token = localStorage.getItem(`token`);

      if (!token) {
        Router.replace(`/auth/signin`);
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
