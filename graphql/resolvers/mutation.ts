/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import { MutationResolvers } from '../../types/types';

const getAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 2000 + 1);
  return `https://avatars.dicebear.com/api/open-peeps/${randomNumber}.svg`;
};

// CRUD
const Mutation: MutationResolvers = {
  newNote: async (_, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: `Adam Scott`,
    });
  },

  deleteNote: async (_, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  },

  updateNote: async (_, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      },
    );
  },

  // Authentication
  signUp: async (_, { username, email, password }, { models }) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar: getAvatar(),
        password: hashed,
      });
      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    } catch (error) {
      // if there's a problem creating the account, throw an error
      console.log(error);
      throw new Error(`Error creating account`);
    }
  },

  signIn: async (_, { username, email, password }, { models }) => {
    if (email) {
      // normalize email address
      email = email.trim().toLowerCase();
    }

    //Look for user name or email address
    const user = await models.User.findOne({ $or: [{ email }, { username }] });

    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError(`Error signing in`);
    }

    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError(`Error signing in`);
    }
    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  },
};

export default Mutation;
