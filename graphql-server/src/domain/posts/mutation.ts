import { MutationResolvers } from "../../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { verifyJWT } from "../../modules/auth.js";

export const createPost: MutationResolvers["createPost"] = async (
  _,
  { title, content, token },
  { dataSources }
) => {
  try {
    if (!token) {
      return {
        code: 401,
        success: false,
        message: "No token provided",
      };
    }

    const user = verifyJWT(token);

    if (!user) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await dataSources.db.post.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

    return {
      code: 201,
      success: true,
      message: "Post created successfully",
      post,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        code: 400,
        success: false,
        message: error.message,
      };
    }

    return {
      code: 500,
      success: false,
      message: "Internal server error",
    };
  }
};

export const deletePost: MutationResolvers["deletePost"] = async (
  _,
  { id, token },
  { dataSources }
) => {
  try {
    if (!token) {
      return {
        code: 401,
        success: false,
        message: "No token provided",
      };
    }

    const user = verifyJWT(token);

    if (!user) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await dataSources.db.post.findUnique({
      where: { id },
    });

    if (!post) {
      return {
        code: 404,
        success: false,
        message: "Post not found",
      };
    }

    if (post.userId !== user.id) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    await dataSources.db.post.delete({
      where: { id },
    });

    return {
      code: 200,
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        code: 400,
        success: false,
        message: error.message,
      };
    }
    return {
      code: 500,
      success: false,
      message: "Internal server error",
    };
  }
};

export const updatePost: MutationResolvers["updatePost"] = async (
  _,
  { id, title, content, token },

  { dataSources }
) => {
  try {
    if (!token) {
      return {
        code: 401,
        success: false,
        message: "No token provided",
      };
    }

    const user = verifyJWT(token);

    if (!user) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await dataSources.db.post.findUnique({
      where: { id },
    });

    if (!post) {
      return {
        code: 404,
        success: false,
        message: "Post not found",
      };
    }

    if (post.userId !== user.id) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const updatePost = await dataSources.db.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    return {
      code: 200,
      success: true,
      message: "Post updated successfully",
      post: updatePost,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        code: 400,
        success: false,
        message: error.message,
      };
    }
    return {
      code: 500,
      success: false,
      message: "Internal server error",
    };
  }
};
