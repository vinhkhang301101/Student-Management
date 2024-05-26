import ApiError from "../utils/ApiError.js";

const isTeacher = (req, res, next) => {
  if (req.user.role != "teacher") {
    throw new ApiError(403, "No permission!");
  }
  next();
};

export default isTeacher;
