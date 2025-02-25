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
