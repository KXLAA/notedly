import { useQuery, gql } from '@apollo/client';
import Header from 'components/common/Header';
import LandingPage from 'components/home/LandingPage';
import Head from 'next/head';

// GraphQL query to get all Notes
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { notes } = data.noteFeed;

  console.log(notes);

  return (
    <>
      <Head>
        <title>notedly</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header />

        <LandingPage notes={notes} />
      </>
    </>
  );
}
