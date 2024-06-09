import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../middlewares/async.js";
import Classes from "../models/Class.js";
// import User from "../models/User.js";

class classController {
  // [GET] /class
  getClasses = catchAsync(async (req, res, next) => {
    const classes = await Classes.find();
    const classesArr = classes.map((classes, index) => {
      return {
        _id: classes._id,
        code: classes.code,
        subject: classes.subject,
        slot: classes.slot,
      };
    });
    res.status(200).json({
      success: true,
      data: classesArr,
    });
  });
  
  // [POST] /class/add-class
  addClass = catchAsync(async (req, res, next) => {
    const { subject, code, slot } = req.body;
    const classes = await Classes.create({ subject, code, slot });
    await classes.save().then(() =>
      res.status(201).json({
        success: true,
        data: {
          code: code,
          subject: subject,
          slot: slot,
        },
      })
    );
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

  // [PUT] /class/update/:id
  updateClass = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { code, subject, slot } = req.body;
    const classes = await Classes.findById(id);
    if (!classes) {
      throw new ApiError(400, "This classes does not exist");
    }
    classes.code = code;
    classes.subject = subject;
    classes.slot = slot;
    try {
      await classes.save();
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      throw new ApiError(400, "Failed to update!");
    }
  });

  // [DELETE] /class/delete/:id
  removeClass = catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      await Classes.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      throw new ApiError(400, "Failed to delete!");
    }
  });
}

export default new classController();
