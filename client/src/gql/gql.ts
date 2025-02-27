/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
<<<<<<< HEAD
    "\n    mutation SignIn($username: String!, $password: String!) {\n      signIn(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n      }\n    }\n  ": typeof types.SignInDocument,
    "\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  ": typeof types.CreateUserDocument,
    "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n": typeof types.CreateLikeDocument,
    "\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n": typeof types.DeleteLikeDocument,
    "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n": typeof types.ToggleLikeDocument,
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  query GetPostsByPopularity($isAsc: Boolean) {\n    getPostsByPopularity(isAsc: $isAsc) {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.GetPostsByPopularityDocument,
    "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.QueryDocument,
};
const documents: Documents = {
    "\n    mutation SignIn($username: String!, $password: String!) {\n      signIn(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n      }\n    }\n  ": types.SignInDocument,
    "\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  ": types.CreateUserDocument,
    "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n": types.CreateLikeDocument,
    "\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n": types.DeleteLikeDocument,
    "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n": types.ToggleLikeDocument,
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetPostsByPopularity($isAsc: Boolean) {\n    getPostsByPopularity(isAsc: $isAsc) {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetPostsByPopularityDocument,
    "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": types.QueryDocument,
=======
    "\n  mutation CreateComment($content: String!, $token: String!, $postId: ID!) {\n    createComment(content: $content, token: $token, postId: $postId) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        userId\n        postId\n      }\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  query GetCommentsByPostId($postId: ID!) {\n    getCommentsByPostId(postId: $postId) {\n      id\n      content\n      post {\n        id\n        user {\n          id\n          username\n        }\n      }\n      user {\n        id\n        username\n      }\n    }\n  }\n": typeof types.GetCommentsByPostIdDocument,
    "\n  mutation CreateLike($postId: ID!, $token: String!) {\n    createLike(postId: $postId, token: $token) {\n      like {\n        id\n      }\n      success\n    }\n  }\n": typeof types.CreateLikeDocument,
    "\n  mutation DeleteLike($id: ID!, $token: String!) {\n    deleteLike(id: $id, token: $token) {\n      success\n    }\n  }\n": typeof types.DeleteLikeDocument,
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      likes {\n        id\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  query GetPost($id: String!) {\n    getPost(id: $id) {\n      id\n      content\n      user {\n        id\n        username\n      }\n    }\n  }\n": typeof types.GetPostDocument,
};
const documents: Documents = {
    "\n  mutation CreateComment($content: String!, $token: String!, $postId: ID!) {\n    createComment(content: $content, token: $token, postId: $postId) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        userId\n        postId\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  query GetCommentsByPostId($postId: ID!) {\n    getCommentsByPostId(postId: $postId) {\n      id\n      content\n      post {\n        id\n        user {\n          id\n          username\n        }\n      }\n      user {\n        id\n        username\n      }\n    }\n  }\n": types.GetCommentsByPostIdDocument,
    "\n  mutation CreateLike($postId: ID!, $token: String!) {\n    createLike(postId: $postId, token: $token) {\n      like {\n        id\n      }\n      success\n    }\n  }\n": types.CreateLikeDocument,
    "\n  mutation DeleteLike($id: ID!, $token: String!) {\n    deleteLike(id: $id, token: $token) {\n      success\n    }\n  }\n": types.DeleteLikeDocument,
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      likes {\n        id\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetPost($id: String!) {\n    getPost(id: $id) {\n      id\n      content\n      user {\n        id\n        username\n      }\n    }\n  }\n": types.GetPostDocument,
>>>>>>> 5898743 (Ajout de Creation de commentaires et de l'affiche de tous les commentaires sous le post en question)
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(source: "\n    mutation SignIn($username: String!, $password: String!) {\n      signIn(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n      }\n    }\n  "): (typeof documents)["\n    mutation SignIn($username: String!, $password: String!) {\n      signIn(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n      }\n    }\n  "];
=======
export function graphql(source: "\n  mutation CreateComment($content: String!, $token: String!, $postId: ID!) {\n    createComment(content: $content, token: $token, postId: $postId) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        userId\n        postId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($content: String!, $token: String!, $postId: ID!) {\n    createComment(content: $content, token: $token, postId: $postId) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        userId\n        postId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCommentsByPostId($postId: ID!) {\n    getCommentsByPostId(postId: $postId) {\n      id\n      content\n      post {\n        id\n        user {\n          id\n          username\n        }\n      }\n      user {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCommentsByPostId($postId: ID!) {\n    getCommentsByPostId(postId: $postId) {\n      id\n      content\n      post {\n        id\n        user {\n          id\n          username\n        }\n      }\n      user {\n        id\n        username\n      }\n    }\n  }\n"];
>>>>>>> 5898743 (Ajout de Creation de commentaires et de l'affiche de tous les commentaires sous le post en question)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  "): (typeof documents)["\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(source: "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPostsByPopularity($isAsc: Boolean) {\n    getPostsByPopularity(isAsc: $isAsc) {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostsByPopularity($isAsc: Boolean) {\n    getPostsByPopularity(isAsc: $isAsc) {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"];
=======
export function graphql(source: "\n  mutation DeleteLike($id: ID!, $token: String!) {\n    deleteLike(id: $id, token: $token) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLike($id: ID!, $token: String!) {\n    deleteLike(id: $id, token: $token) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      likes {\n        id\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      likes {\n        id\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPost($id: String!) {\n    getPost(id: $id) {\n      id\n      content\n      user {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPost($id: String!) {\n    getPost(id: $id) {\n      id\n      content\n      user {\n        id\n        username\n      }\n    }\n  }\n"];
>>>>>>> 5898743 (Ajout de Creation de commentaires et de l'affiche de tous les commentaires sous le post en question)

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;