import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../middlewares/async.js";
import Mongo from "../config/db.js"
import Files from "../models/File.js";

class fileController {
  // [GET] /:filename
  getFile = catchAsync(async (req, res, next) => {
    const { filename } = req.params;
    console.log(filename);
    Mongo.gridfs.find({ filename }).toArray((err, files) => {
      console.log("filessssss: ", files);
      if (err || !files || !files.length) {
        throw new ApiError(500, "Cannot get file!!");
      }
      Mongo.gridfs.openDownloadStreamByName(filename).pipe(res);
    });
  });
}

export default new fileController();
