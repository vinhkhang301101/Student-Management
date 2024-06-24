import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  JWT_EXPIRES_ACCESS,
  JWT_EXPIRES_REFRESH,
  JWT_SECRET,
  JWT_SECRET_REFRESH,
} from "../config/index.js";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required!"],
    },
    userID: {
      type: String,
      required: [true, "User ID is required!"],
      unique: true,
    },
    classcode: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Teacher", "Student"],
      required: [true, "Role is required!"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    paidStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, "Must be at least 6 characters"],
    },
    date: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    recoverCode: {
      type: String,
      default: null,
    },
  },
  {
    collection: "nb-users",
    timestamps: true,
  }
);

userSchema.methods.getJwtAccessToken = function () {
  return jwt.sign(
    {
      role: this.role,
      email: this.email,
      fullname: this.fullname,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_ACCESS,
    }
  );
};

userSchema.methods.getJwtRefeshToken = function () {
  return jwt.sign(
    { fullname: this.fullname, role: this.role, email: this.email },
    JWT_SECRET_REFRESH,
    {
      expiresIn: JWT_EXPIRES_REFRESH,
    }
  );
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    // Hash Password
    // default rounds = 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

mongoose.set("runValidators", true);

export default mongoose.model("Users", userSchema);
