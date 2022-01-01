/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { MutationResolvers } from '../../types/types';

const getAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 2000 + 1);
  return `https://avatars.dicebear.com/api/open-peeps/${randomNumber}.svg`;
};

// CRUD
const Mutation: MutationResolvers = {
  newNote: async (_, args, { models, user }) => {
    // if there is no user on the context, throw an authentication error
    if (!user) {
      throw new AuthenticationError(`You must be signed in to create a note`);
    }
    return await models.Note.create({
      content: args.content,
      title: args.title,
      //reference the author's mongo id
      author: new mongoose.Types.ObjectId(user.id),
    });
  },

  deleteNote: async (_, { id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError(`You must be signed in to delete a note`);
    }

    // find the note
    const note = await models.Note.findById(id);

    // if the note owner and current user don't match, throw a forbidden error
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError(`You don't have permissions to delete the note`);
    }

    try {
      // if everything checks out, remove the note
      await note.remove();
      return true;
    } catch (error) {
      return false;
    }
  },

  updateNote: async (_, { content, id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError(`You must be signed in to update a note`);
    }

    // find the note
    const note = await models.Note.findById(id);

    // if the note owner and current user don't match, throw a forbidden error
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError(`You don't have permissions to update the note`);
    }

    // Update the note in the db and return the updated note
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

  toggleFavorite: async (_, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError(`You must be signed in to update a note`);
    }

    // check to see if the user has already favorited the note
    const noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    // if the user exists in the list
    // pull them from the list and reduce the favoriteCount by 1
    if (hasUser >= 0) {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: new mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        { new: true },
      );
    } else {
      // if the user doesn't exist in the list
      // add them to the list and increment the favoriteCount by 1
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: new mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        { new: true },
      );
    }
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
