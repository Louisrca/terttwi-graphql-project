import { graphql } from "../../gql";

export const SIGNIN_USER = graphql(
  `
    mutation SignIn($username: String!, $password: String!) {
      signIn(username: $username, password: $password) {
        code
        success
        message
        token
      }
    }
  `
);
