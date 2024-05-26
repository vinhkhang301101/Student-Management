// import ApiError from "../../utils/ApiError.js";
import { catchAsync } from "../middlewares/async.js";
import Announcement from "../models/Announcement.js";
import User from "../models/User.js";

class announcementController {
  // [POST] /announcement
  createAnnouncement = catchAsync(async (req, res, next) => {
    const { title, description, date } = req.body;
    const announce = await Announcement.create({
      title,
      description,
      date,
      //   users: userIdArr,
      //   isAll,
    });

    res.status(200).json({
      success: true,
      data: announce,
    });
    
    // try {
    //   await announce.save();
      //   const users = await User.find({ _id: { $in: userIdArr } });
      //   for (const user of users) {
      //     user.announcements.push(announce);
      //     user.markModified("announcements");
      //     await user.save();
      //   }
    
    // } catch (error) {
    //   res.status(400, {
    //     success: false,
    //   });
    // }
  });

  // [GET] /announcement/
  getAnnouncements = catchAsync(async (req, res, next) => {
    // if (req.user.role == "teacher") {
      const allAnnounce = await Announcement.find();
      res.status(200).json({
        success: true,
        data: allAnnounce,
      });
    // } else {
    //   const { fullname } = req.user;
    //   const user = await User.findOne({ fullname }).populate("announcements");
    //   res.status(200).json({
    //     success: true,
    //     allAnnounce: user.announcements,
    //   });
    // }
  });

  deleteAnnouncements = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  });
}

export default new announcementController();
