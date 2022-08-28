import { TokenType } from "types";

export const getTokenExpUnix = (type: TokenType, date = new Date()): number => {
  const expInSeconds = getTokenExpConfig(type);
  const expDate = new Date(date.getTime() + expInSeconds * 1000);
  return Math.floor(expDate.getTime() / 1000);
};

export const getTokenExpDate = (type: TokenType, date = new Date()): Date => {
  const expInSeconds = getTokenExpConfig(type);
  const expDate = new Date(date.getTime() + expInSeconds * 1000);
  return expDate;
};

const getTokenExpConfig = (type: TokenType): number => {
  switch (type) {
    // default 1h
    case TokenType.ACCESS_TOKEN:
      const accessTokenExp = parseInt(
        process.env.JWT_ACCESS_TOKEN_EXPIRATION as string,
        10
      );
      return isNaN(accessTokenExp) ? 3600 : accessTokenExp;
    // default 1d
    case TokenType.REFRESH_TOKEN:
      const refreshTokenExp = parseInt(
        process.env.JWT_REFRESH_TOKEN_EXPIRATION as string,
        10
      );
      return isNaN(refreshTokenExp) ? 86400 : refreshTokenExp;
  }
};
