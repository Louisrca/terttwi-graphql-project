import { QueryResolvers } from "../../types";

export const getPosts: QueryResolvers["getPosts"] = async (
  _,
  __,
  { dataSources }
) => {
  const posts = await dataSources.db.post.findMany();
  if (posts.length === 0) {
    throw new Error("No posts found");
  }
  return posts;
};

export const getPost: QueryResolvers["getPost"] = async (
  _,
  { id },
  { dataSources }
) => {
  const post = await dataSources.db.post.findUnique({ where: { id } });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const getPostsByUser: QueryResolvers["getPostsByUser"] = async (
  _,
  __,
  { dataSources, user }
) => {
  if (!user) {
    throw new Error("Invalid token");
  }

  const posts = await dataSources.db.post.findMany({
    where: { userId: user.id },
  });
  if (posts.length === 0) {
    throw new Error("No posts found");
  }
  return posts;
};

export const getPostsByPopularity: QueryResolvers["getPostsByPopularity"] =
  async (_, { isAsc }, { dataSources }) => {
    const posts = await dataSources.db.post.findMany({
      orderBy: [{ likes: { _count: isAsc ? "asc" : "desc" } }],
    });

    if (posts.length === 0) {
      throw new Error("No posts found");
    }

    return posts;
  };
export const getPostByAuthor: QueryResolvers["getPostByAuthor"] = async (
  _,
  { author },
  { dataSources }
) => {
  return await dataSources.db.post.findMany({
    where: {
      user: {
        username: { contains: author },
      },
    },
  });
};
