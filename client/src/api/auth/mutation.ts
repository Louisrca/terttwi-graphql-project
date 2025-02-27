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

export const REGISTER_USER = graphql(
  `
    mutation CreateUser($username: String!, $password: String!, $email: String!) {
      createUser(username: $username, password: $password, email: $email) {
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
