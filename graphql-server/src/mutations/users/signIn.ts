import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { comparePasswords } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import { createJWT } from "../../modules/auth.js";

export const signIn: MutationResolvers["signIn"] = async (
  _,
  { username, password },
  { dataSources },
  __
) => {
  try {
    if (username === "" || password === "") {
      return {
        code: 401,
        message: "Username or password is empty",
        success: false,
        token: null,
      };
    }
    const user = await dataSources.db.user.findFirstOrThrow({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        code: 401,
        message: "User not found",
        success: false,
        token: null,
      };
    }
    const isValidatePassword = await comparePasswords(password, user.password);

    if (!isValidatePassword) {
      return {
        code: 401,
        message: "Invalid password",
        success: false,
        token: null,
      };
    }

    return {
      code: 200,
      message: "User signed in",
      success: true,
      token: createJWT(user),
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        code: 401,
        message: e.message,
        success: false,
        token: null,
      };
    }
    return {
      code: 400,
      message: (e as Error).message,
      success: false,
      token: null,
    };
  }
};
