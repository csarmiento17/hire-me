const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(email: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
