const { AuthenticationError } = require("apollo-server-express");
const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },
    job: async (parent, { title }) => {
      return Job.findOne({ title }).select("-__v");
    }
  },
  Mutation: {

    saveJob: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, { $push: { savedJobs: _id } });
      }
      throw new AuthenticationError('Not logged in');
    },


    applyJob: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, { $push: { savedJobs: _id } });
      }
      throw new AuthenticationError('Not logged in');
    },


    updateJob: async (parent, { _id }, context) => {
      if (context.user) {
        return await Job.findByIdAndUpdate(_id, { $inc: { savedUser: +1 } });
      }
      throw new AuthenticationError('Not logged in');
    },

    register: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
