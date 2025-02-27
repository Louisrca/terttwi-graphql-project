import { graphql } from "../../gql";

export const GET_COMMENTS_BY_POSTID = graphql(`
  query GetCommentsByPostId($postId: ID!) {
    getCommentsByPostId(postId: $postId) {
      id
      content
      post {
        id
        user {
          id
          username
        }
      }
      user {
        id
        username
      }
    }
  }
`);
