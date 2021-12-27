import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import dbConnect from 'lib/dbConnect';
import typeDefs from 'graphql/schema/schema';
import resolvers from 'graphql/resolvers';
import models from 'models';
const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === `OPTIONS`) {
    res.end();
    return false;
  }

  await startServer;
  await dbConnect();
  console.log(`connected to mongoDb`);
  await apolloServer.createHandler({
    path: `/api/graphql`,
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
