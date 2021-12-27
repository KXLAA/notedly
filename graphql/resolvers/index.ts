import Mutation from './mutation';
import Query from './query';
import { GraphQLDateTime } from 'graphql-scalars';

const resolvers = {
  Mutation,
  Query,
  DateTime: GraphQLDateTime,
};

export default resolvers;
