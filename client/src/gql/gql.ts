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
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  mutation CreateLike($postId: ID!, $token: String!) {\n    createLike(postId: $postId, token: $token) {\n      code\n      message\n      success\n    }\n  }\n": typeof types.CreateLikeDocument,
    "\n      mutation DeleteLike($deleteLikeId: ID!, $token: String!) {\n  deleteLike(id: $deleteLikeId, token: $token) {\n    code\n    message\n    success\n    success\n  }\n}\n  ": typeof types.DeleteLikeDocument,
};
const documents: Documents = {
    "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  mutation CreateLike($postId: ID!, $token: String!) {\n    createLike(postId: $postId, token: $token) {\n      code\n      message\n      success\n    }\n  }\n": types.CreateLikeDocument,
    "\n      mutation DeleteLike($deleteLikeId: ID!, $token: String!) {\n  deleteLike(id: $deleteLikeId, token: $token) {\n    code\n    message\n    success\n    success\n  }\n}\n  ": types.DeleteLikeDocument,
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
export function graphql(source: "\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    getPosts {\n      id\n      content\n      user {\n        id\n        username\n      }\n      comments {\n        id\n        content\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLike($postId: ID!, $token: String!) {\n    createLike(postId: $postId, token: $token) {\n      code\n      message\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLike($postId: ID!, $token: String!) {\n    createLike(postId: $postId, token: $token) {\n      code\n      message\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteLike($deleteLikeId: ID!, $token: String!) {\n  deleteLike(id: $deleteLikeId, token: $token) {\n    code\n    message\n    success\n    success\n  }\n}\n  "): (typeof documents)["\n      mutation DeleteLike($deleteLikeId: ID!, $token: String!) {\n  deleteLike(id: $deleteLikeId, token: $token) {\n    code\n    message\n    success\n    success\n  }\n}\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;