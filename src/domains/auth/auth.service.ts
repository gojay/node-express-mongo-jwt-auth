import { JwtPayload } from "jsonwebtoken";

import { sign as JwtAsymmetricSign } from "domains/jwk/asymmetric/asymmetric.service";
import { sign as JwtSymmetricSign } from "domains/jwk/symmetric/symmetric.service";
import { IUserDoc } from "domains/user/user.interface";
import User from "domains/user/user.model";
import { getUserByEmail } from "domains/user/user.service";
import RefreshToken from "domains/refreshtoken/refreshtoken.model";
import { IResourceDoc } from "domains/resource/resource.interface";

import { HttpError, RefreshTokenError } from "exceptions";
import { TokenType } from "types";
import { getTokenExpDate } from "utils";
import { IUserToken } from "./auth.interface";

export const login = async (
  email: string,
  password: string
): Promise<IUserToken> => {
  const user = await getUserByEmail(email, "password email role");
  if (!user) {
    throw new HttpError(400, "incorrect email and password");
  }

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    throw new HttpError(400, "incorrect email and password");
  }

  return createUserToken(user);
};

export const refreshToken = async (token: string): Promise<IUserToken> => {
  const refreshTokenDoc = await RefreshToken.findOne({
    token,
  })
    .populate<{ user: IUserDoc }>("user")
    .select("-user.password")
    .exec();
  if (!refreshTokenDoc) {
    throw new RefreshTokenError("refresh token not found");
  }

  await refreshTokenDoc.remove();

  if (refreshTokenDoc.isExpired()) {
    throw new RefreshTokenError("refresh token already expired");
  }

  return createUserToken(refreshTokenDoc.user);
};

const createUserToken = async (user: IUserDoc): Promise<IUserToken> => {
  const populatedUser = await user.populate<{
    role: {
      name: string;
      resources: IResourceDoc[];
    };
  }>({
    path: "role",
    model: "Role",
    select: "-_id name resources",
    populate: {
      path: "resources",
      model: "Resource",
      select: "-_id scopes",
    },
  });

  const payload: JwtPayload = {
    sub: user._id,
    email: user.email,
    role: populatedUser.role.name,
    scopes: User.GetScopes(populatedUser.role.resources),
  };
  const userToken =
    process.env.JWK_TYPE === "symmetric"
      ? await createUserTokenSymmetric(payload)
      : await createUserTokenAsymmetric(payload);

  await RefreshToken.create({
    user: user._id,
    token: userToken.refresh_token,
    expiredAt: getTokenExpDate(TokenType.REFRESH_TOKEN),
  });

  return userToken;
};

const createUserTokenAsymmetric = async (
  payload: JwtPayload
): Promise<IUserToken> => {
  const { sub } = payload;
  const [accessToken, refreshToken] = await Promise.all([
    JwtAsymmetricSign(TokenType.ACCESS_TOKEN, payload),
    JwtAsymmetricSign(TokenType.REFRESH_TOKEN, { sub }),
  ]);

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};
const createUserTokenSymmetric = async (
  payload: JwtPayload
): Promise<IUserToken> => {
  const { sub } = payload;
  const [accessToken, refreshToken] = await Promise.all([
    JwtSymmetricSign(TokenType.ACCESS_TOKEN, payload),
    JwtSymmetricSign(TokenType.REFRESH_TOKEN, { sub }),
  ]);
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};
