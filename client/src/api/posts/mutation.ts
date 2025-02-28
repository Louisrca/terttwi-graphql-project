import { graphql } from "../../gql";
export const CREATE_POST = graphql(`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      code
      message
      success
      post {
        user {
          username
        }
      }
    }
  }
`);

export const DELETE_POST = graphql(`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      code
      message
      success
    }
  }
`);

export const UPDATE_POST = graphql(`
  mutation UpdatePost($id: ID!, $content: String!) {
    updatePost(id: $id, content: $content) {
      code
      message
      post {
        id
        content
        userId
      }
      success
    }
  }
`);
