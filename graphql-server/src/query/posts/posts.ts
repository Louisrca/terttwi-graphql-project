import { QueryResolvers } from "../../types";

export const getPosts: QueryResolvers["getPosts"] = async (
  _,
  __,
  { dataSources }
) => {
  return await dataSources.db.post.findMany();
};
