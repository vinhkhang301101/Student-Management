import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import ApiError from "../utils/ApiError.js";

const jwtAuth = (req, res, next) => {
  const headerToken = req.headers["authorization"];

  if (!headerToken) {
    throw new ApiError(401, "Access denied!");
  }

  const token = headerToken.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Access denied!");
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is expired!");
    }
    throw new ApiError(401, "Access denied!");
  }
};

export default jwtAuth;
