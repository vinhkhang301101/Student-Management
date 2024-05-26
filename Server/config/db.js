import mongoose from "mongoose";

class Mongo {
    static connectDB = () => {
        mongoose
          .connect(process.env.MONGO_URI)
          .then(() => {
            console.log("Connect to database successfully!");
          })
          .catch((err) => console.log("Can not connect to DB!"));
    }
}

export default Mongo;