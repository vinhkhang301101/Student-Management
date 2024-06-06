import { catchAsync } from "../middlewares/async.js";
import {
  JWT_EXPIRES_ACCESS,
  JWT_SECRET,
  JWT_SECRET_REFRESH,
} from "../config/index.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

function generateMixedString(length) {
  let result = "";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const allChars = uppercaseChars + numbers;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    result += allChars.charAt(randomIndex);
  }

  return result;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendMailTo(receiver) {
  // send mail with defined transport object
  const code = generateMixedString(6);
  await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: receiver, // list of receivers
    subject: "Recover code", // Subject line
    text: `Your code to change password: ${code}`,
  });
  return code;
}

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

    // const accessToken = jwt.sign(
    //   {
    //     email: existedEmail.email,
    //     fullname: existedEmail.fullname,
    //     role: existedEmail.role,
    //   },
    //   JWT_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );

    // res.json({
    //   success: true,
    //   accessToken,
    // });

    const accessToken = await existedEmail.getJwtAccessToken();
    const refreshToken = await existedEmail.getJwtRefeshToken();
    existedEmail.refresh_token = refreshToken;
    existedEmail
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          data: { accessToken: accessToken, refreshToken: refreshToken },
        });
      })
      .catch((err) => {
        throw new ApiError(400, "Error when saving");
      });
  });

  refreshToken = catchAsync(async (req, res, next) => {
    const refreshToken = req.headers.authorization.split(" ")[1];
    if (!refreshToken) {
      throw new ApiError(401, "Unauthorized!");
    }
    const existedToken = await User.findOne({ refresh_token: refreshToken });
    if (!existedToken) {
      throw new ApiError(403, "Access denied!");
    }
    // if (!refreshTokens.includes(refreshToken)) {
    //   throw new ApiError(403, "Access denied")
    // }
    try {
      const { id, role, username } = jwt.verify(
        refreshToken,
        JWT_SECRET_REFRESH,
        { ignoreExpiration: false }
      );
      const newAccessToken = jwt.sign({ id, role, username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_ACCESS,
      });
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      throw new ApiError(403, "Refresh token expired");
    }
  });

  // [GET] /people
  getPeople = catchAsync(async (req, res, next) => {
    const user = await User.find({}, { _id: 1, fullname: 1 });
    res.status(200).json({
      success: true,
      people: user,
    });
  });

  // [GET] /
  getUser = catchAsync(async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email });
    res.status(200).json({
      success: true,
      data: {
        fullname: user.fullname,
        studentID: user.studentID,
        firstname: user.firstname,
        lastname: user.lastname,
        classcode: user.classcode,
        gender: user.gender,
        role: user.role,
        email: user.email,
        date: user.date,
        phone: user.phone,
        paidStatus: user.paidStatus,
        address: user.address,
      },
    });
  });

  // [GET] /student/:id
  getStudentById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const student = await User.findById(id);
    if (!student) {
      throw new ApiError(400, "This student does not exist!");
    } else if (!student.studentID) {
      throw new ApiError(400, "This is not student!");
    } else {
      res.status(200).json({
        success: true,
        data: {
          _id: student._id,
          fullname: student.fullname,
          studentID: student.studentID,
          firstname: student.firstname,
          lastname: student.lastname,
          classcode: student.classcode,
          gender: student.gender,
          role: student.role,
          email: student.email,
          date: student.date,
          phone: student.phone,
          paidStatus: student.paidStatus,
          address: student.address,
        },
      });
    }
  });

  // [GET] /
  getUsers = catchAsync(async (req, res, next) => {
    const user = await User.find();
    const userArr = user.map((user, index) => {
      return {
        _id: user._id,
        studentID: user.studentID,
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
        paidStatus: user.paidStatus,
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
    const user = await User.find({ role: "Student" });
    const userArr = user.map((user, index) => {
      return {
        _id: user._id,
        studentID: user.studentID,
        fullname: user.fullname,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        gender: user.gender,
        date: user.date,
        classcode: user.classcode,
        phone: user.phone,
        paidStatus: user.paidStatus,
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
    const {
      fullname,
      studentID,
      firstname,
      date,
      lastname,
      gender,
      classcode,
      paidStatus,
      phone,
      address,
    } = req.body;
    const { email } = req.user;
    const user = await User.findOne({ email });
    user.fullname = fullname;
    user.studentID = studentID;
    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;
    user.classcode = classcode;
    user.paidStatus = paidStatus;
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
    const {
      fullname,
      email,
      studentID,
      firstname,
      date,
      lastname,
      gender,
      classcode,
      paidStatus,
      phone,
      address,
    } = req.body;
    const user = await User.findOne({ email });
    user.fullname = fullname;
    user.studentID = studentID;
    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;
    user.classcode = classcode;
    user.paidStatus = paidStatus;
    user.date = date;
    user.phone = phone;
    user.address = address;
    await user.save();
    res.status(200).json({
      success: true,
    });
  });

  // [POST] /send-email
  sendEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "Not found email!");
    }
    const recoverCode = await sendMailTo(user.email);
    user.recoverCode = recoverCode;
    await user.save();
    res.status(200).json({
      success: true,
      email: user.email,
    });
  });

  // [POST] /change-password
  forgotPassword = catchAsync(async (req, res, next) => {
    const { email, recoverCode, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "Not found email!");
    }
    if (recoverCode == user.recoverCode) {
      user.password = newPassword;
      user.recoverCode = null;
      await user.save();
      res.status(200).json({
        success: true,
      });
    } else {
      throw new ApiError(400, "Wrong code!");
    }
  });

  // [PUT] /update-password
  changePassword = catchAsync(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { email } = req.user;
    const user = await User.findOne({ email });
    const isMatch = bcryptjs.compareSync(oldPassword, user.password);
    if (!isMatch) {
      throw new ApiError(400, "Wrong old password!");
    }
    try {
      user.password = newPassword;
      await user.save();
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      throw new ApiError(400, "Failed to update password!");
    }
  });

  // // [PUT] /update-email
  // updateEmail = catchAsync(async (req, res, next) => {
  //   const { oldEmail, newEmail } = req.body;
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { email: oldEmail },
  //       { oldEmail, email: newEmail },
  //       { new: true }
  //     );
  //     res.status(200).json({
  //       success: true,
  //       data: user,
  //     });
  //   } catch (error) {
  //     throw new ApiError(400, "Email is not existed!");
  //   }
  // });
}

export default new authController();
