import { Resolvers } from "./types";
import { createUser } from "./domain/users/createUser.js";
import { signIn } from "./domain/users/signIn.js";
import { createPost } from "./domain/posts/mutation.js";
import { me } from "./domain/users/query.js";
import { getPosts, getPost, getPostsByUser } from "./domain/posts/query.js";

export const resolvers: Resolvers = {
  Query: {
    me,
    getPosts,
    getPost,
    getPostsByUser,
  },

  Post: {
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
  },
};
