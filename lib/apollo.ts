import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `http://localhost:3000/api/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(`token`);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : ``,
    },
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  resolvers: {},
});

cache.writeQuery({
  query: gql`
    query getAuth {
      isLoggedIn
    }
  `,
  data: {
    isLoggedIn:
      typeof window !== `undefined` && !!localStorage.getItem(`token`),
  },
});

apolloClient.onResetStore(async () =>
  cache.writeQuery({
    query: gql`
      query getAuth {
        isLoggedIn
      }
    `,
    data: {
      isLoggedIn:
        typeof window !== `undefined` && !!localStorage.getItem(`token`),
    },
  }),
);

export default apolloClient;
