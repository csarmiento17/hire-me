import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      
    }
  }
`;

export const QUERY_SUBSCRIBE = gql`
  query subscribe($productNum: Int!) {
    subscribe(productNum: $productNum) {
      session
    }
  }
`;

