import { QueryResolvers } from "../../types";

export const me: QueryResolvers["me"] = async (
  _,
  __,
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Unauthorized");
  }
  const id = user?.id;

  return dataSources.db.user.findUnique({
    where: {
      id: user.id,
    },
  });
};
