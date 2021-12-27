import Mutation from './mutation';
import Query from './query';
import { GraphQLDateTime } from 'graphql-scalars';
import { Resolvers } from 'types/types';

const resolvers: Resolvers = {
  Mutation,
  Query,
  DateTime: GraphQLDateTime,
};

export default resolvers;
