/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  post?: Maybe<Post>;
  postId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateLikeResponse = {
  __typename?: 'CreateLikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteLikeResponse = {
  __typename?: 'DeleteLikeResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID']['output'];
  post?: Maybe<Post>;
  postId: Scalars['ID']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CreateCommentResponse;
  createLike?: Maybe<CreateLikeResponse>;
  createPost?: Maybe<CreatePostResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deleteComment: DeleteCommentResponse;
  deleteLike?: Maybe<DeleteLikeResponse>;
  deletePost?: Maybe<DeletePostResponse>;
  signIn?: Maybe<SignInResponse>;
  updateComment: UpdateCommentResponse;
  updatePost?: Maybe<UpdatePostResponse>;
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateLikeArgs = {
  postId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationDeleteLikeArgs = {
  id: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getComment?: Maybe<Comment>;
  getCommentByUser?: Maybe<Array<Maybe<Comment>>>;
  getComments?: Maybe<Array<Maybe<Comment>>>;
  getPost?: Maybe<Post>;
  getPostByAuthor?: Maybe<Array<Maybe<Post>>>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getPostsByPopularity?: Maybe<Array<Maybe<Post>>>;
  getPostsByUser?: Maybe<Array<Maybe<Post>>>;
  me?: Maybe<User>;
};


export type QueryGetCommentArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCommentByUserArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPostByAuthorArgs = {
  author: Scalars['String']['input'];
};


export type QueryGetPostsByPopularityArgs = {
  isAsc?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetPostsByUserArgs = {
  token: Scalars['String']['input'];
};


export type QueryMeArgs = {
  id: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdateCommentResponse = {
  __typename?: 'UpdateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdatePostResponse = {
  __typename?: 'UpdatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Array<{ __typename?: 'Post', id: string, content?: string | null, user?: { __typename?: 'User', id: string, username: string } | null, comments?: Array<{ __typename?: 'Comment', id: string, content?: string | null, user?: { __typename?: 'User', id: string, username: string } | null } | null> | null } | null> | null };


export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;