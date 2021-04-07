const { Message, Channel } = require("../../db/models");

//Fetch Message
exports.fetchMessage = async (messageId, next) => {
  try {
    const mesage = await Message.findByPk(messageId);
    return mesage;
  } catch (error) {
    next(error);
  }
};

// Get the message list
exports.getMessageList = async (req, res, next) => {
  try {
    const mesage = await Message.findAll({
      attributes: { exclude: ["channelId", "createdAt", "updatedAt"] },
      include: {
        model: Channel,
        as: "Channel",
        attributes: ["id"],
      },
    });
    res.status(200).json(mesage);
  } catch (error) {
    next(error);
  }
};

//add message
exports.addMessage = async (req, res, next) => {
  try {
    req.body.channelId = req.channel.id;
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

//add channel
// exports.addChannel = async (req, res, next) => {
//   try {
//     // req.body.messageId = req.message.id;
//     const newChannel = await Channel.create(req.body);
//     res.status(201).json(newChannel);
//   } catch (error) {
//     next(error);
//   }
// };

// update
exports.messageUpdate = async (req, res) => {
  const { messageId } = req.params;
  try {
    const foundmessage = await Message.findByPk(messageId);
    if (foundmessage) {
      await foundmessage.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete
exports.messageDelete = async (req, res) => {
  const { messageId } = req.params;
  try {
    const foundmessage = await Message.findByPk(messageId);
    if (foundmessage) {
      await foundmessage.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Message with this ID doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
