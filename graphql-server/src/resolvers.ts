import { Resolvers } from "./types";
import { createUser } from "./domain/users/createUser.js";
import { signIn } from "./domain/users/signIn.js";
import { createPost, deletePost } from "./domain/posts/mutation.js";
import { me } from "./domain/users/query.js";
import { getPosts, getPost, getPostsByUser } from "./domain/posts/query.js";
import {
  getComment,
  getComments,
  getCommentByUser,
} from "./domain/comments/query.js";
import { createComment, deleteComment, updateComment } from "./domain/comments/mutation.js";
import { createLike, deleteLike } from "./domain/likes/mutation.js";

export const resolvers: Resolvers = {
  Query: {
    me,
    getPosts,
    getPost,
    getPostsByUser,
    getComments,
    getComment,
    getCommentByUser,
  },

  Post: {
    user: async (parent, _, { dataSources }) => {
      return await dataSources.db.user.findUnique({
        where: { id: parent.userId },
      });
    },
    comments: async (parent, _, { dataSources }) => {
      return await dataSources.db.comment.findMany({
        where: { postId: parent.id },
      });
    },

    likes: async (parent, _, { dataSources }) => {
      return await dataSources.db.like.count({
        where: { postId: parent.id },
      });
    },
  },
  Comment: {
    user: async (parent, _, { dataSources }) => {
      return await dataSources.db.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },

  Mutation: {
    createUser,
    signIn,
    createPost,
    createComment,
    createLike,
    deletePost,
    updateComment,
    deleteComment,
    deleteLike,
  },
};
