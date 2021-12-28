import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  scalar DateTime

  type Note {
    id: ID
    content: String
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoritedBy: [User!]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
  }

  type Query {
    hello: String
    notes: [Note]
    note(id: ID): Note
    user(username: String): User
    users: [User]
    me: User!
  }

  type Mutation {
    # CRUD
    newNote(content: String!): Note
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!

    # Authentication & user accounts
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;

export default typeDefs;
