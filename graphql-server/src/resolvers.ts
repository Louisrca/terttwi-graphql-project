import { Resolvers } from "./types";
import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { createPost } from "./mutations/posts/createPost.js";
import { me } from "./query/users/user.js";
import { getPosts } from "./query/posts/posts.js";

export const resolvers: Resolvers = {
  Query: {
    me,
    getPosts,
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
