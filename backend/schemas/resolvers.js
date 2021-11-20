const { AuthenticationError } = require("apollo-server-express");
// import { PrismaClient } from '@prisma/client';

const { User, Job } = require("../models");
const { signToken } = require("../utils/auth");

// const prisma = new PrismaClient();

const resolvers = {
  Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email }).select("-__v -password");
    },
    allJobs: async () => {
      return Job.find().select("-__v");
    },
    searchedJobs: async (parent, args) => {
      return Job.find({ title: { "$regex": args.title, "$options": "i" }}).select("-__v");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addToSavedJobs: async (parent, args, context) => {
      if (context.user) {
        let jobId = args.savedJobId
        const searchedJob = await Job.findOne({_id:jobId}).select("-__v")
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedJobs:searchedJob}},
          { new: true }
        )
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    addToAppliedJobs: async (parent, args, context) => {
      if (context.user) {
        let jobId = args.appliedJobId
        const searchedJob = await Job.findOne({_id:jobId}).select("-__v")
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { appliedJobs:searchedJob} },
          { new: true }
        )
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
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
