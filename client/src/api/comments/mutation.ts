import { graphql } from "../../gql";

export const POST_COMMENT = graphql(`
  mutation CreateComment($content: String!, $postId: ID!) {
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

export const DELETE_COMMENT = graphql(`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      code
      success
      message
    }
  }
`);

export const UPDATE_COMMENT = graphql(`
  mutation UpdateComment($id: ID!, $content: String!) {
    updateComment(id: $id, content: $content) {
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
