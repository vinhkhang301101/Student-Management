import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../middlewares/async.js";
import Announcement from "../models/Announcement.js";
import Files from "../models/File.js";
import User from "../models/User.js";
import { handleError } from "../../StudentManagement/src/utils/handleError.js";

class announcementController {
  // [POST] /announcement
  createAnnouncement = catchAsync(async (req, res, next) => {
    const { title, description, userIDArr, isAll } = req.body;
    const announce = await Announcement.create({
      title,
      description,
      users: userIDArr,
      isAll,
    });
    try {
      await announce.save();
      const users = await User.find({ _id: { $in: userIDArr } });
      for (const user of users) {
        user.announcements.push(announce);
        user.markModified("announcements");
        await user.save();
      }
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(400, "Failed to create!");
    }
  });

  // [GET] /announcement/
  getAllAnnouncements = catchAsync(async (req, res, next) => {
    const allAnnounce = await Announcement.find();
    const announcementsArr = allAnnounce.map((announcement, index) => {
      return {
        announcementID: announcement._id,
        title: announcement.title,
        description: announcement.description,
        users: announcement.userIDArr,
        isAll: announcement.isAll,
        updatedAt: announcement.updatedAt,
      };
    });
    res.status(200).json({
      success: true,
      data: announcementsArr,
    });
  });

  // [GET] /announcement/:id
  getAnnouncementById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const announcement = await Announcement.findById(id).populate("files");
    if (!announcement) {
      throw new ApiError(400, "This announcement does not exist!");
    } else {
      res.status(200).json({
        success: true,
        data: {
          announcementID: announcement._id,
          title: announcement.title,
          description: announcement.description,
          updatedAt: announcement.updatedAt,
          files: announcement.files
        },
      });
    }
  });

  // [PUT] /announcement/update
  updateAnnouncement = catchAsync(async (req, res, next) => {
    const { announcementID, title, description } = req.body;
    const announcement = await Announcement.findById(announcementID);
    if (!announcement) {
      throw new ApiError(400, "This announcement does not exist");
    }
    announcement.title = title;
    announcement.description = description;
    try {
      await announcement.save();
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      throw new ApiError(400, "Failed to update!");
    }
  });

  // [DELETE] /announcement/:id
  deleteAnnouncements = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);
    for (const file of announcement.files) {
      if (file) {
        await Files.findByIdAndDelete(file);
      }
    }
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  });
}

export default new announcementController();
