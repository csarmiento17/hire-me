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
{
  me{
    firstName
    lastName
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
    savedJobsCount
    appliedJobs {
      _id
      title
      company
      address
      jobDescription
      jobTypes
      coordinates
    }
    appliedJobsCount
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
 {
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
`
