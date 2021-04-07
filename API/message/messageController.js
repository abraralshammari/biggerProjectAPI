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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(mesage);
  } catch (error) {
    next(error);
  }
};

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
