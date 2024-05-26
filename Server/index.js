import express from "express";
import cors from "cors";
import { PORT } from "./config/index.js";
import Mongo from "./config/db.js";
import router from "./routes/index.js"
import { catchError } from "./middlewares/error.js";

const app = express();

app.use(cors())

app.use(express.json());

// connect DB
Mongo.connectDB();

// routes
router(app);

// error Middlewares
app.use(catchError)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
