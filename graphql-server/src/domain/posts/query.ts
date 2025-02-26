import { QueryResolvers } from "../../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { verifyJWT } from "../../modules/auth.js";

export const getPosts: QueryResolvers["getPosts"] = async (
  _,
  __,
  { dataSources }
) => {
  return await dataSources.db.post.findMany();
};

export const getPost: QueryResolvers["getPost"] = async (
  _,
  { id },
  { dataSources }
) => {
  return await dataSources.db.post.findUnique({ where: { id } });
};

export const getPostsByUser: QueryResolvers["getPostsByUser"] = async (
  _,
  { token },
  { dataSources }
) => {
  const user = verifyJWT(token);
  if (!user) {
    throw new Error("Invalid token");
  }

  return await dataSources.db.post.findMany({ where: { userId: user.id } });
};

export const getPostsByPopularity: QueryResolvers["getPostsByPopularity"] =
  async (_, { isAsc }, { dataSources }) => {
    return await dataSources.db.post.findMany({
      orderBy: [{ likes: { _count: isAsc ? "asc" : "desc" } }],
    });
  };
