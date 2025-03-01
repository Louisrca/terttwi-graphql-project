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

export const GET_POSTS_BY_ID = graphql(`
  query GetPost($id: String!) {
    getPost(id: $id) {
      id
      content
      user {
        id
        username
      }
    }
  }
`);

export const GET_POSTS_BY_USER = graphql(`
  query GetPostsByUser {
    getPostsByUser {
      id
      content
      user {
        id
        username
      }
    }
  }
`);

export const GET_POST_BY_USER = graphql(`
  query GetPostByAuthor($author: String!) {
    getPostByAuthor(author: $author) {
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
