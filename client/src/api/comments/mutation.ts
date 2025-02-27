import { graphql } from "../../gql";

export const POST_COMMENT = graphql(`
  mutation CreateComment($content: String!,  $postId: ID!) {
    createComment(content: $content, postId: $postId) {
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
