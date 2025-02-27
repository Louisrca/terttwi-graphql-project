import { graphql } from "../../gql";

export const POST_COMMENT = graphql(`
  mutation CreateComment($content: String!, $token: String!, $postId: ID!) {
    createComment(content: $content, token: $token, postId: $postId) {
      code
      success
      message
      comment {
        id
        content
        userId
        postId
      }
    }
  }
`);
