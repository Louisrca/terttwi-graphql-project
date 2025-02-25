import gql from "graphql-tag";

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    content: String
    userId: ID!
    user: User
    comments: [Comment]
    likes: [Like]
  }

  type Comment {
    id: ID!
    content: String
    userId: ID!
    user: User
    post: Post
  }

  type Like {
    id: ID!
    userId: ID!
    user: User
    post: Post
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type CreatePostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type CreateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type CreateLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
    like: Like
  }

  type SignInResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }

  type User {
    id: ID!
    username: String!
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): CreateUserResponse
    signIn(username: String!, password: String!): SignInResponse
    createPost(
      title: String!
      content: String!
      token: String!
    ): CreatePostResponse
  }

  type Query {
    me(id: String!): User
  }
`;
