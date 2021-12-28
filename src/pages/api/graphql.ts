/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import jwt from 'jsonwebtoken';
import dbConnect from 'lib/dbConnect';
import typeDefs from 'graphql/schema/schema';
import resolvers from 'graphql/resolvers';
import models from 'models';

const cors = Cors();

// get the user info from a JWT
const getUser = (token: string) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      // if there's a problem with the token, throw an error
      throw new Error(`Session invalid`);
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // add the db models and the user to the context
    return { models, user };
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
