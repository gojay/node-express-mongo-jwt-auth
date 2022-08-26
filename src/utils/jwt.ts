import { JWT_TYPE } from "types";

export const getJwtExp = (type: JWT_TYPE, date = new Date()): number => {
  const expInSeconds = getExpConfig(type);
  const expDate = new Date(date.getTime() + expInSeconds * 60 * 60 * 1000);
  return Math.floor(expDate.getTime() / 1000);
};

const getExpConfig = (type: JWT_TYPE): number => {
  switch (type) {
    // default 1h
    case JWT_TYPE.ACCESS_TOKEN:
      const accessTokenExp = parseInt(
        process.env.JWT_ACCESS_TOKEN_EXPIRATION as string,
        10
      );
      return isNaN(accessTokenExp) ? 3600 : accessTokenExp;
    // default 1d
    case JWT_TYPE.REFRESH_TOKEN:
      const refreshTokenExp = parseInt(
        process.env.JWT_ACCESS_TOKEN_EXPIRATION as string,
        10
      );
      return isNaN(refreshTokenExp) ? 86400 : refreshTokenExp;
  }
};
