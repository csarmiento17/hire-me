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
    address:String
    jobTypes:String
    coordinates:[String]
  }

  type Auth {
    token: ID!
    user: User
  }

  input JobInput{
    title:String
    jobDescription:String
    company:String
    address:String
    jobTypes:String
    coordinates:[String]
  }

  type Query {
    me:User
    user(username: String!): User
    job(title:String!):Job
    jobs:[Job]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(firstName: String!, lastName:String! email: String!, password: String!): Auth
    addToSavedJobs(jobData:JobInput!):User
    addToAppliedJobs(jobData:JobInput!):User
  }
`;

module.exports = typeDefs;
