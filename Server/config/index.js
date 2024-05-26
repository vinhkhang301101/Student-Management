import dotenv from "dotenv";

dotenv.config({ path: ".env" })

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || null;

export { PORT, JWT_SECRET };