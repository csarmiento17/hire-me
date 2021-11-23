import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      savedJobs {
        _id
        title
        jobDescription
        company
        address
        jobTypes
        coordinates
      }
      appliedJobs {
        _id
        title
        jobDescription
        company
        address
        jobTypes
        coordinates
      }
      savedJobsCount
      appliedJobsCount
      lengthOfSubscription
      premium {
        startOfSubscription
        lengthOfSubscription
        endOfSubscription
      }
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

export const QUERY_SEARCHEDJOBS = gql`
  query searchedJobs($title: String!) {
    searchedJobs(title: $title) {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
  }
`;

export const QUERY_JOBS = gql`
query allJobs {
    allJobs {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
  }
`;
export const QUERY_SUBSCRIPTION_LENGTH = gql`
  query getLengthOfSubscription {
    getLengthOfSubscription {
      lengthOfSubscription
    }
  }
`;