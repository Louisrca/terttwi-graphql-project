import { QueryResolvers } from "../../types";

export const getComments: QueryResolvers["getComments"] = async (
  _,
  __,
  { dataSources }
) => {
  return await dataSources.db.comment.findMany();
};

export const getComment: QueryResolvers["getComment"] = async (
  _,
  { id },
  { dataSources }
) => {
  return await dataSources.db.comment.findUnique({
    where: {
      id,
    },
  });
};

export const getCommentByUser: QueryResolvers["getCommentByUser"] = async (
  _,
  __,
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Invalid token");
  }
  return await dataSources.db.comment.findMany({
    where: {
      userId: user.id,
    },
  });
};
