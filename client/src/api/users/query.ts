import { graphql } from "../../gql";

export const GET_ME = graphql(`
  query Query {
    me {
      id
      username
      createdAt
      updatedAt
    }
  }
`);
