import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../middlewares/async.js";
import Classes from "../models/Class.js";
// import User from "../models/User.js";

class classController {
  // [POST] /class/add-class
  addClass = catchAsync(async (req, res, next) => {
    const { subject, code, slot } = req.body;
    const classes = await Classes.create({ subject, code, slot });
    await classes.save().then(() =>
      res.status(201).json({
        success: true,
        data: classes,
      })
    );
  });

  // [GET] /class
  getClasses = catchAsync(async (req, res, next) => {
    const classes = await Classes.find();
    res.status(200).json({
      success: true,
      data: classes,
    });
  });

  // [GET] /class/:id/
  getClassDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const classes = await Classes.findById(id);
    if (!classes) {
      throw new ApiError(404, "Class not found!");
    }
    res.json({
      success: true,
      data: classes,
    });
  });

  // [PUT] /class/
  updateClass = catchAsync(async (req, res, next) => {
    const { subjectCode, subject, code, slot } = req.body;
    try {
      const classes = await Classes.findOneAndUpdate(
        { code: subjectCode },
        { subject, code, slot },
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: classes,
      });
    } catch (error) {
      throw new ApiError(400, "Email is not existed!");
    }

    // // Filter only admin and teacher of class
    // if (req.user.role == "teacher" && req.user.id != classes.teacher) {
    //   throw new ApiError(400, "No permission!");
    // } else {
    //   classes.subject = subject;
    //   classes.code = code;
    //   classes.slot = slot;
    //   await classes.save();
    // }
  });

  // [DELETE] /class/:id
  deleteClass = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Classes.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  });
}

export default new classController();
