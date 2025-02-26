import { MutationResolvers } from "../../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { verifyJWT } from "../../modules/auth.js";
import { userInfo } from "os";

export const createComment: MutationResolvers["createComment"] = async (
    _,
    {content, token, postId},
    { dataSources}
) => {
    try {
        if(!token){
            return {
                code: 401,
                success: false,
                message: "No token provided",
            };
        }
        const user = verifyJWT(token);

        if(!user){
            return {
                code: 401,
                success: false,
                message: "Unauthorized",
            };
        }

        const comment = await dataSources.db.comment.create({
            data: {
                content,
                userId: user.id,
                postId
            }
        });

        return{
            code: 201,
            success: true,
            message: "Comment created successfully",
            comment,
        };
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
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

export const deleteComment: MutationResolvers["deleteComment"] = async (
    _,
    { id, token },
    {dataSources}
) => {
    try {
        if(!token){
            return {
                code: 401,
                success: false,
                message: "No token provided",
            };
        }
        const user = verifyJWT(token);

        if(!user){
            return {
                code: 401,
                success: false,
                message: "Unauthorized",
            };
        }

        const comment = await dataSources.db.comment.delete({
            where: {
                userId: user.id,
                id,
            }
        });

        return{
            code: 201,
            success: true,
            message: "Comment deleted successfully",
            comment,
        };
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
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
}

export const updateComment: MutationResolvers["updateComment"] = async (
    _,
    { id, content, token},
    { dataSources }
) => {
    try {
        if(!token){
            return {
                code: 401,
                success: false,
                message: "No token provided",
            };
        }
        const user = verifyJWT(token);

        if(!user){
            return {
                code: 401,
                success: false,
                message: "Unauthorized",
            };
        }

        const comment = await dataSources.db.comment.update({
            where: {
                id,
                userId: user.id,
            },
            data: {
                content,
            }
        });

        return{
            code: 201,
            success: true,
            message: "Comment updated successfully",
            comment,
        };
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
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
}