const { AuthenticationError } = require("apollo-server-express");
const { User, Job, Premium } = require("../models");
const { signToken } = require("../utils/auth");

// import stripe package
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email }).select("-__v -password");
    },
    job: async (parent, { title }) => {
      return Job.findOne({ title }).select("-__v");
    },
    jobs: async () => {
      return Job.find().select("-__v");
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
    subscribe: async (parent, { productNum }, context) => {
      // array of product objects
      const products = [
        {
          name: "One Month Subscription",
          price: 1.99
        },
        {
          name: "Six Months Subscription",
          price: 5.99
        },
        {
          name: "One Year Subscription",
          price: 9.99
        }
      ];

      // need to use dynamic URL: context.headers.referer
      const url = new URL("http://localhost:3000").origin;
      const line_items = [];

      // generate product id
      const product = await stripe.products.create({
        name: products[productNum].name
      });

      // generate price id
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: products[productNum].price * 100,
        currency: 'cad'
      });

      // add price id to the line items array
      line_items.push({
        price: price.id,
        quantity: 1
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      
      return { session: session.id };
    },
  },
  Mutation: {
    addToSavedJobs: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, {
          $push: { savedJobs: args._id },
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    addToAppliedJobs: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, {
          $push: { appliedJobs: args._id },
        });
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
    addPremium: async (parent, { expiryDate }, context) => {
      if (context.user) {
        const premium = await Premium.create({ expiryDate });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { premium: premium._id } },
          { new: true }
        );
    
        return premium;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
