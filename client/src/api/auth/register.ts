import { graphql } from "../../gql";

export const REGISTER_USER = graphql(
  `
    mutation SignIn($username: String!, $password: String!, email: String!) {
      signIn(username: $username, password: $password, email: $email) {
        code
        success
        message
        user{
          id
          username
        }
        
      }
    }
  `
);
