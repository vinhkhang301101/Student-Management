import ApiError from "../utils/ApiError"

const authorise = (...roles) => (req, res, next) => {
    const role = req.user.role
    if (!roles || !roles.includes(role)) {
      throw new ApiError(403, "Access denied!");
    }
}

export default authorise