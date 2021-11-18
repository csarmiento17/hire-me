const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    firstName:String
    lastName:String
    email:String
    savedJobs:[Job]
    appliedJobs:[Job]
    savedJobsCount:Int
    appliedJobsCount:Int
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
  }
`;

module.exports = typeDefs;
