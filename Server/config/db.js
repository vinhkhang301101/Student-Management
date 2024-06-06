import mongoose from "mongoose";

class Mongo {
  constructor() {
    this.gridfs = null;
  }
  static connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connect to database successfully!");
      })
      .catch((err) => console.log("Can not connect to DB!"));
    const conn = mongoose.connection;
    conn.once("open", () => {
      this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.BUCKET_NAME
      });
    });
  };
}

export default Mongo;
