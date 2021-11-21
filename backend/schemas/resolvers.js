const { AuthenticationError } = require("apollo-server-express");
const { User, Job, Premium } = require("../models");
const { signToken } = require("../utils/auth");

// import stripe package
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select("-__v -password")
        .populate("savedJobs")
        .populate("appliedJobs")
        .populate("premium");
    },
    allJobs: async () => {
      return Job.find().select("-__v");
    },
    searchedJobs: async (parent, args) => {
      return Job.find({ title: { $regex: args.title, $options: "i" } }).select(
        "-__v"
      );
      // return Job.find({ title: { $regex: args.title } }).select("-__v");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedJobs")
          .populate("appliedJobs")
          .populate("premium");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    subscribe: async (parent, { productNum }, context) => {
      // array of product objects
      const products = [
        {
          name: "One Month Subscription",
          price: 1.99,
        },
        {
          name: "Six Months Subscription",
          price: 5.99,
        },
        {
          name: "One Year Subscription",
          price: 9.99,
        },
      ];

      // need to use dynamic URL: context.headers.referer
      const url = new URL("http://localhost:3000").origin;
      const line_items = [];

      // generate product id
      const product = await stripe.products.create({
        name: products[productNum].name,
      });

      // generate price id
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: products[productNum].price * 100,
        currency: "cad",
      });

      // add price id to the line items array
      line_items.push({
        price: price.id,
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    getLengthOfSubscription: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addToSavedJobs: async (parent, args, context) => {
      if (context.user) {
        let jobId = args.savedJobId;
        const searchedJob = await Job.findOne({ _id: jobId }).select("-__v");
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedJobs: searchedJob } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    removeSavedJobs: async (parent, args, context) => {
      if (context.user) {
        let jobId = args.savedJobId;
        // const searchedJob = await Job.findOne({ _id: jobId }).select("-__v");
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedJobs: {_id:jobId} } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },


    addToAppliedJobs: async (parent, args, context) => {
      if (context.user) {
        let jobId = args.appliedJobId;
        const searchedJob = await Job.findOne({ _id: jobId }).select("-__v");
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { appliedJobs: searchedJob } },
          { new: true }
        );
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
    addLengthOfSubscription: async (parent, { productNum }, context) => {
      if (context.user) {
        await User.updateOne(
          { _id: context.user._id },
          {
            lengthOfSubscription: productNum,
          }
        );

        return await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeLengthOfSubscription: async (parent, args, context) => {
      if (context.user) {
        await User.updateOne(
          { _id: context.user._id },
          {
            lengthOfSubscription: null,
          }
        );

        return await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addPremium: async (parent, { subsLength }, context) => {
      if (context.user) {
        const premium = await Premium.create({
          lengthOfSubscription: subsLength,
        });

        await User.updateOne(
          { _id: context.user._id },
          { premium: premium._id }
        );

        return premium;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removePremium: async (parent, args, context) => {
      if (context.user) {
        return await User.updateOne(
          { _id: context.user._id },
          { premium: null }
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
