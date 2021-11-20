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

export const ADD_LENGTH_OF_SUBSCRIPTION = gql`
  mutation addLengthOfSubscription($productNum: Int!) {
    addLengthOfSubscription(productNum: $productNum) {
      firstName
      lastName
      email
      lengthOfSubscription
    }
  }
`;

export const REMOVE_LENGTH_OF_SUBSCRIPTION = gql`
  mutation removeLengthOfSubscription {
    removeLengthOfSubscription {
      firstName
      lastName
      email
      lengthOfSubscription
    }
  }
`;

export const ADD_PREMIUM = gql`
  mutation addPremium($subsLength: Int!) {
    addPremium(subsLength: $subsLength) {
      startOfSubscription
      lengthOfSubscription
      endOfSubscription
    }
  }
`;

export const REMOVE_PREMIUM = gql`
  mutation removePremium {
    removePremium {
      premium {
        startOfSubscription
        lengthOfSubscription
        endOfSubscription
      }
    }
  }
`;
