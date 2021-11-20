const { gql } = require("apollo-server-express");
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const typeDefs = gql`
  type User {
    _id:ID
    firstName:String
    lastName:String
    email:String
    savedJobs:[Job]
    appliedJobs:[Job]
    savedJobsCount:Int
    appliedJobsCount:Int
    lengthOfSubscription:Int
    premium: Premium
  }

  type Premium {
    startOfSubscription:String
    lengthOfSubscription:Int
    endOfSubscription:String
  }

  type Job {
    _id:ID
    title:String
    jobDescription:String
    company:String
    address:String
    jobTypes:String
    coordinates:[String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Subscribe {
    session: ID!
  }

  type Query {
    me:User
    user(username: String!): User
    job(title:String!):Job
    subscribe(productNum: Int!): Subscribe
    getLengthOfSubscription:User
    jobs:[Job]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(firstName: String!, lastName:String! email: String!, password: String!): Auth
    addToSavedJobs(_id:ID!):User
    addToAppliedJobs(_id:ID!):User
    addLengthOfSubscription(productNum: Int!):User
    removeLengthOfSubscription:User
    addPremium(subsLength: Int!):Premium
    removePremium:User
  }
`;

module.exports = typeDefs;
