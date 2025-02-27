import { graphql } from "../../gql";

export const GET_POSTS = graphql(`
  query GetPosts {
    getPosts {
      id
      content
      user {
        id
        username
      }
      numberOflikes
      likes {
        id
      }
      comments {
        id
        content
        user {
          id
          username
        }
      }
    }
  }
`);
