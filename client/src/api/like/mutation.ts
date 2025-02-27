import { graphql } from "../../gql";

export const POST_LIKE = graphql(`
  mutation CreateLike($postId: ID!) {
    createLike(postId: $postId) {
      like {
        id
      }
      success
    }
  }
`);

export const DELETE_LIKE = graphql(`
  mutation DeleteLike($id: ID!) {
    deleteLike(id: $id) {
      success
    }
  }
`);

export const TOGGLE_LIKE = graphql(`
  mutation ToggleLike($postId: ID!) {
    toggleLike(postId: $postId)
  }
`);
