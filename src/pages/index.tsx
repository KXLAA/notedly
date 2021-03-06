import { useQuery, gql } from '@apollo/client';
import LandingPage from 'components/home/LandingPage';
import Head from 'next/head';
import { Grid } from 'components/common/grid/Grid';

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
        title
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
      <Grid>
        <LandingPage notes={notes} />

        {data.noteFeed.hasNextPage && (
          <button
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: data.noteFeed.cursor,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  return {
                    noteFeed: {
                      cursor: fetchMoreResult.noteFeed.cursor,
                      hasNextPage: fetchMoreResult.noteFeed.hasNextPage, // combine the new results and the old
                      notes: [
                        ...previousResult.noteFeed.notes,
                        ...fetchMoreResult.noteFeed.notes,
                      ],
                      __typename: `noteFeed`,
                    },
                  };
                },
              })
            }
          >
            Load More
          </button>
        )}
      </Grid>
    </>
  );
}
