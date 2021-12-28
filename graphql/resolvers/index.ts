import Mutation from './mutation';
import Query from './query';
import Note from './note';
import User from './user';
import { GraphQLDateTime } from 'graphql-scalars';
import { Resolvers } from 'types/types';

const resolvers: Resolvers = {
  Mutation,
  Query,
  Note,
  User,
  DateTime: GraphQLDateTime,
};

export default resolvers;
