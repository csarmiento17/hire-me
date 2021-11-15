const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedJobs:[Job]
    appliedJobs:[Job]
  }

  type Job {
    _id:ID
    title: String
    jobDescription:String
    company:String
    location:String
    jobTypes:String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    job(title:String!):Job
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(username: String!, email: String!, password: String!): Auth
    saveJob(_id:ID!):User
    applyJob(_id:ID!):User
    updateJob(_id:ID!):Job
  }
`;

module.exports = typeDefs;
