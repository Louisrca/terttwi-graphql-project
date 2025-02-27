import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
  
  type Post {
    id: ID!
    content: String
    userId: ID!
    user: User
    createdAt: DateTime
    updatedAt: DateTime
    comments: [Comment]
    numberOflikes: Int
    likes: [Like]
  }

  type Comment {
    id: ID!
    content: String
    userId: ID!
    createdAt: DateTime
    updatedAt: DateTime
    user: User
    post: Post
    postId: ID!
  }

  type Like {
    id: ID!
    userId: ID!
    user: User
    post: Post
    postId: ID!
  }

  type User {
    id: ID!
    username: String!
    createdAt: DateTime
    updatedAt: DateTime
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

  type UpdateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type UpdatePostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type DeletePostResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type DeleteCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type DeleteLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type SignInResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): CreateUserResponse
    signIn(username: String!, password: String!): SignInResponse
    createPost(content: String!, token: String!): CreatePostResponse
    createComment(
      content: String!
      token: String!
      postId: ID!
    ): CreateCommentResponse!
    deletePost(id: ID!, token: String!): DeletePostResponse
    updateComment(
      id: ID!
      content: String!
      token: String!
    ): UpdateCommentResponse!
    deleteComment(token: String!, id: ID!): DeleteCommentResponse!
    createLike(postId: ID!, token: String!): CreateLikeResponse

    deleteLike(id: ID!, token: String!): DeleteLikeResponse

    updatePost(id: ID!, content: String!, token: String!): UpdatePostResponse
  }

  type Query {
    me(id: String!): User
    getPosts: [Post]
    getPost(id: String!): Post
    getPostsByUser(token: String!): [Post]
    getComments: [Comment]
    getComment(id: String!): Comment
    getCommentByUser(token: String!): [Comment]
    getPostsByPopularity(isAsc: Boolean): [Post]
    getPostByAuthor(author: String!): [Post]
  }
`;
