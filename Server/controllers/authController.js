import { catchAsync } from "../middlewares/async.js";
import { JWT_SECRET } from "../config/index.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

class authController {
  register = catchAsync(async (req, res) => {
    const { fullname, email, password, role } = req.body;
    const user = await User.create({
      fullname,
      email,
      password,
      role,
    });
    res.status(201).json({
      success: true,
      data: user,
    });
  });

  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    // check email in db
    const existedEmail = await User.findOne({ email });
    if (!existedEmail) {
      throw new ApiError(400, "Wrong email or password, please check again!");
    }

    const isMatch = bcrypt.compareSync(password, existedEmail.password);
    if (!isMatch) {
      throw new ApiError(400, "Wrong email or password, please check again!");
    }

    const accessToken = jwt.sign(
      {
        email: existedEmail.email,
        fullname: existedEmail.fullname,
        role: existedEmail.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      accessToken,
    });
  });

  // [GET] /
  getUsers = catchAsync(async (req, res, next) => {
    const user = await User.find();
    const userArr = user.map((user, index) => {
      return {
        _id: user._id,
        studentId: user.studentId,
        fullname: user.fullname,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        gender: user.gender,
        date: user.date,
        subject: user.subject,
        classcode: user.classcode,
        phone: user.phone,
        status: user.status,
        address: user.address,
      };
    });
    res.status(200).json({
      success: true,
      data: userArr,
    });
  });

  // [GET] /all-students
  getAllStudents = catchAsync(async (req, res, next) => {
    const user = await User.find({ role: "student" });
    const userArr = user.map((user, index) => {
      return {
        _id: user._id,
        studentId: user.studentId,
        fullname: user.fullname,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        gender: user.gender,
        date: user.date,
        classcode: user.classcode,
        phone: user.phone,
        status: user.status,
        address: user.address,
      };
    });
    res.status(200).json({
      success: true,
      data: userArr,
    });
  });

  // [PUT]
  updateProfile = catchAsync(async (req, res, next) => {
    const { fullname, date, phone, address } = req.body;
    const { email } = req.user;
    const user = await User.findOne({ email });
    user.fullname = fullname;
    user.date = date;
    user.phone = phone;
    user.address = address;
    await user.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  });

  // [PUT]/update-students
  updateStudents = catchAsync(async (req, res, next) => {
    const { fullname, studentId, firstname, date, lastname, gender, classcode, status, phone, address } = req.body;
    const { email } = req.user;
    const user = await User.findOne({ email });
    user.fullname = fullname;
    user.studentId = studentId;
    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;
    user.classcode = classcode;
    user.status = status;
    user.date = date;
    user.phone = phone;
    user.address = address;
    await user.save();
    res.status(200).json({
      success: true,
    });
  });

  // [PUT] /update-email
  updateEmail = catchAsync(async (req, res, next) => {
    const { oldEmail, newEmail } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { email: oldEmail },
        { oldEmail, email: newEmail },
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      throw new ApiError(400, "Email is not existed!");
    }
  });
}

export default new authController();
