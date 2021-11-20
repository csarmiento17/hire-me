import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
export const ADDTOSAVEDJOBS = gql`
mutation addToSavedJobs($savedJobId:ID!) {
  addToSavedJobs(savedJobId: $savedJobId) {
    _id
    email
    savedJobs {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
    appliedJobs {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
  }
}
`

export const ADDTOAPPLIEDJOBS = gql `
mutation addToAppliedJobs($appliedJobId:ID!) {
  addToAppliedJobs(appliedJobId: $appliedJobId) {
    _id
    email
    savedJobs {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
    appliedJobs {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
  }
}
`
