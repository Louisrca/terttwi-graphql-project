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
      isLiked
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

export const GET_POST_BY_POPULARITY = graphql(`
  query GetPostsByPopularity($isAsc: Boolean) {
    getPostsByPopularity(isAsc: $isAsc) {
      id
      content
      user {
        id
        username
      }
      numberOflikes
      isLiked
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
