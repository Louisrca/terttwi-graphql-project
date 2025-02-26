import { QueryResolvers } from "../../types";
import { verifyJWT } from "../../modules/auth.js";

export const getComments: QueryResolvers["getComments"] = async (
    _,
    __,
    {dataSources}
) =>{
    return await dataSources.db.comment.findMany();
};

export const getComment: QueryResolvers["getComment"] = async (
    _,
    { id },
    { dataSources }
) => {
    return await dataSources.db.comment.findUnique({
        where: {
            id
        }
    });
}

export const getCommentByUser: QueryResolvers["getCommentByUser"] = async (
    _,
    { token },
    { dataSources }
) => {
    const user = verifyJWT(token);
    if(!user){
        throw new Error("Invalid token");
    }
    return await dataSources.db.comment.findMany({
        where: {
            userId: user.id
        }
    })
}