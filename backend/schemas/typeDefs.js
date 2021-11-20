const { gql } = require("apollo-server-express");
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
};

const typeDefs = gql`
  scalar Date

  type User {
    firstName:String
    lastName:String
    email:String
    savedJobs:[Job]
    appliedJobs:[Job]
    savedJobsCount:Int
    appliedJobsCount:Int
    premium: Premium
  }

  type Premium {
    startOfSubscription:Date
    endOfSubscription:Date
  }

  type Job {
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
    jobs:[Job]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(firstName: String!, lastName:String! email: String!, password: String!): Auth
    addToSavedJobs(_id:ID!):User
    addToAppliedJobs(_id:ID!):User
    addPremium(expiryDate: Date!): User
  }
`;

module.exports = typeDefs;
