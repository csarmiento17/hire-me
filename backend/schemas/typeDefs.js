const { gql } = require("apollo-server-express");

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
  }

  type Job {
    _id:ID
    title:String
    jobDescription:String
    company:String
    location:String
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(firstName: String!, lastName:String! email: String!, password: String!): Auth
    addToSavedJobs(_id:ID!):User
    addToAppliedJobs(_id:ID!):User
  }
`;

module.exports = typeDefs;
