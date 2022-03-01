const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const book = await Book.create({ ...args, username: context.user.username });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: book._id } },
          { new: true }
        );
        return book;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
