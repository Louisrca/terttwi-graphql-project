import { QueryResolvers } from "../../types";

export const me: QueryResolvers["me"] = async (
  _,
  __,
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  return dataSources.db.user.findUnique({
    where: {
      id: user.id,
    },
  });
};
