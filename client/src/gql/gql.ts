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
<<<<<<< HEAD
    "\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  ": typeof types.CreateUserDocument,
=======
>>>>>>> c7d99b9 (refactor: like and dislike)
=======
>>>>>>> 363aa83 (add: authentification)
    "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n": typeof types.CreateLikeDocument,
    "\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n": typeof types.DeleteLikeDocument,
    "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n": typeof types.ToggleLikeDocument,
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.GetPostsDocument,
<<<<<<< HEAD
<<<<<<< HEAD
    "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.QueryDocument,
};
const documents: Documents = {
    "\n    mutation SignIn($username: String!, $password: String!) {\n      signIn(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n      }\n    }\n  ": types.SignInDocument,
    "\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  ": types.CreateUserDocument,
=======
};
const documents: Documents = {
    "\n    mutation SignIn($username: String!, $password: String!) {\n      signIn(username: $username, password: $password) {\n        code\n        success\n        message\n        token\n      }\n    }\n  ": types.SignInDocument,
>>>>>>> c7d99b9 (refactor: like and dislike)
=======
    "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.QueryDocument,
};
const documents: Documents = {
>>>>>>> 363aa83 (add: authentification)
    "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n": types.CreateLikeDocument,
    "\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n": types.DeleteLikeDocument,
    "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n": types.ToggleLikeDocument,
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetPostsDocument,
<<<<<<< HEAD
<<<<<<< HEAD
    "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": types.QueryDocument,
=======
>>>>>>> c7d99b9 (refactor: like and dislike)
=======
    "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": types.QueryDocument,
>>>>>>> 363aa83 (add: authentification)
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(source: "\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  "): (typeof documents)["\n    mutation CreateUser($username: String!, $password: String!, $email: String!) {\n      createUser(username: $username, password: $password, email: $email) {\n        code\n        success\n        message\n        user{\n          id\n          username\n        }\n        \n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
=======
>>>>>>> 363aa83 (add: authentification)
export function graphql(source: "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
=======
export function graphql(source: "\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLike($postId: ID!) {\n    createLike(postId: $postId) {\n      like {\n        id\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
>>>>>>> c7d99b9 (refactor: like and dislike)
export function graphql(source: "\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLike($id: ID!) {\n    deleteLike(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      numberOflikes\n      isLiked\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 363aa83 (add: authentification)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    me {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"];
<<<<<<< HEAD
=======
>>>>>>> c7d99b9 (refactor: like and dislike)
=======
>>>>>>> 363aa83 (add: authentification)

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;