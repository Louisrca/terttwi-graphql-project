import { Resolvers } from "./types";
import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signIn.js";
import { me } from "./query/users/user.js";

export const resolvers: Resolvers = {
  Query: {
    me,
  },

  Mutation: {
    createUser,
    signIn,
  },
};
