import { QueryResolvers } from "../../types";

export const me: QueryResolvers["me"] = async (
  _,
  { id },
  { dataSources },
  __
) => {
  return dataSources.db.user.findUnique({
    where: {
      id,
    },
  });
};
