import { catchAsync } from "../middlewares/async.js";
import Chat from "../models/Chat.js";

class chatController {
  getFullChats = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const receiver = id;
    const sender = req.user._id;
    console.log(req.user);
    if (receiver == null) {
      res.status(200).json({
        success: true,
        messages: messages,
      });
    }
    const messages = await Chat.find({
      sender: { $in: [receiver, sender] },
      receiver: { $in: [receiver, sender] },
    });
    res.status(200).json({
      success: true,
      messages: messages,
    });
  });
}

export default new chatController();
