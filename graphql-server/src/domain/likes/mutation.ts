import { MutationResolvers } from "../../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createLike: MutationResolvers["createLike"] = async (
  _,
  { postId },
  { dataSources, user }
) => {
  try {
    if (!user) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const isUserAlreadyLiked = await dataSources.db.like.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (isUserAlreadyLiked) {
      return {
        code: 401,
        message: "Post already liked",
        success: false,
      };
    }

    const like = await dataSources.db.like.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    return {
      code: 201,
      success: true,
      message: "Post liked successfully",
      like,
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

export const deleteLike: MutationResolvers["deleteLike"] = async (
  _,
  { id },
  { dataSources, user }
) => {
  try {
    if (!user) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const unlike = await dataSources.db.like.delete({
      where: {
        id,
      },
    });

    return {
      code: 201,
      success: true,
      message: "Post unliked successfully",
      unlike,
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

export const toggleLike: MutationResolvers["toggleLike"] = async (
  _,
  { postId },
  { dataSources, user }
) => {
  if (!user) throw new Error("Non authentifié");

  // Vérifier si un like existe déjà pour cet utilisateur et ce post
  const existingLike = await dataSources.db.like.findFirst({
    where: { postId, userId: user.id },
  });

  if (existingLike) {
    // Supprimer le like existant (unlike)
    await dataSources.db.like.delete({ where: { id: existingLike.id } });
    return false;
  } else {
    // Créer un nouveau like
    await dataSources.db.like.create({
      data: { postId, userId: user.id },
    });
    return true;
  }
};
