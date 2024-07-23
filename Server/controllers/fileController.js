import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../middlewares/async.js";
import Mongo from "../config/db.js"
import Announcement from "../models/Announcement.js";
import Files from "../models/File.js";
import { upload } from "../middlewares/upload.js";

class fileController {
  // [GET] /:filename
  getFile = catchAsync(async (req, res, next) => {
    const { filename } = req.params;
    // console.log(filename);
    Mongo.gridfs.find({ filename }).toArray((err, files) => {
      // console.log("filessssss: ", files);
      if (err || !files || !files.length) {
        throw new ApiError(500, "Cannot get file!!");
      }
      Mongo.gridfs.openDownloadStreamByName(filename).pipe(res);
    });
  });

  // [POST] /file
  uploadFile = async (req, res, next) => {
    const uploadSingle = upload.single("file");
    uploadSingle(
      req,
      res,
      catchAsync(async (err) => {
        if (err instanceof ApiError) {
          res.status(err.statusCode).json({
            success: false,
            message: err.message,
          });
        } else if (err) {
          // Handle other errors
          res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        } else {
          const announcement = await Announcement.findById(req.body.id);
          if (!announcement) {
            res.status(404).json({
              success: false,
              message: "Announcement not found!",
            });
          } else {
            try {
              const fileObj = await Files.create({
                title: req.body.title,
                filename: req.file.originalname,
                pdf: req.file.filename,
                announcement: announcement._id,
              });
              announcement.files.push(fileObj);
              announcement.markModified("files");
              await announcement.save();
              res.status(200).json({
                success: true,
                message: "Upload successfully!",
              });
            } catch (error) {
              res.status(400).json({
                success: false,
                message: error?.message,
              });
            }
          }
        }
      })
    );
  };

  // [GET] /:id
  getFileById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const file = await Files.findById(id);
    if (!file) {
      throw new ApiError(400, "This file does not exist!");
    } else {
      await file.save();
      res.status(200).json({
        success: true,
        file: file,
      });
    }
  });
}

export default new fileController();
