import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required!"],
    },
    studentId: {
      type: String,
      unique: true,
      default: "",
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    classcode: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: [true, "Role is required!"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
    },
    subject: {
      type: String,
      default: "",
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
  },
  {
    collection: "nb-users",
    timestamps: true,
  }
);

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    // Hash Password
    // default rounds = 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
})

mongoose.set("runValidators", true);

export default mongoose.model("Users", userSchema);
