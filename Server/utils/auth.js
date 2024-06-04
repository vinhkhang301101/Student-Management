import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, JWT_SECRET_REFRESH } from "../config/index.js";

const decodeDataFromToken = (token, secret) => {
  return jwt.verify(token, secret, { ignoreExpiration: true });
};

const clearUserRefreshTokens = (refreshToken, refreshTokens = []) => {
  const { id } = decodeDataFromToken(refreshToken, JWT_SECRET_REFRESH);
  return refreshTokens.filter((rtoken) => {
    const { id: savedUserId } = decodeDataFromToken(
      rtoken,
      JWT_SECRET_REFRESH
    );
    return savedUserId !== id;
  });
};

export { clearUserRefreshTokens };
