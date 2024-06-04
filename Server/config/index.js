import dotenv from "dotenv";

dotenv.config({ path: ".env" })

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || null;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH || null;
const JWT_EXPIRES_ACCESS = process.env.JWT_EXPIRES_ACCESS || "5m";
const JWT_EXPIRES_REFRESH = process.env.JWT_EXPIRES_REFRESH || "5m";

export {
  PORT,
  JWT_SECRET,
  JWT_SECRET_REFRESH,
  JWT_EXPIRES_ACCESS,
  JWT_EXPIRES_REFRESH,
};