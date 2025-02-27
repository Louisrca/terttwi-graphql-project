import { graphql } from "../../gql";

export const POST_LIKE = graphql(`
  mutation CreateLike($postId: ID!, $token: String!) {
    createLike(postId: $postId, token: $token) {
      like {
        id
      }
      success
    }
  }
`);

export const DELETE_LIKE = graphql(`
  mutation DeleteLike($id: ID!, $token: String!) {
    deleteLike(id: $id, token: $token) {
      success
    }
  }
`);
