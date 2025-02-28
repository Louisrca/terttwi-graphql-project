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
