import { catchAsync } from "../middlewares/async.js";
import Chat from "../models/Chat.js";

class chatController {
  getFullChats = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const receiver = id;
    const sender = req.user._id;
    console.log(id);
    if (receiver == null) {
      res.status(200).json({
        success: true,
        messages: [],
      });
    }
    const messages = await Chat.find({
      sender: { $in: [receiver, sender] },
      receiver: { $in: [receiver, sender] },
    });
    console.log(messages);
    res.status(200).json({
      success: true,
      messages,
    });
  });
}

export default new chatController();
