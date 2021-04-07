const { Message, Channel, User } = require("../../db/models");

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

// add user
exports.addUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    req.body.UserId = userId;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// adding user to message
exports.addUserToMessage = async (req, res, next) => {
  const { userId } = req.params;
  const { messageId } = req.params;
  try {
    messageId;
    const user = await User.findByPk(userId);
    const message = await Message.findByPk(messageId);
    if (req.user.id === message.admin) {
      message.addUser(user);
      res.status(201).json(user);
    } else {
      res.status(401).json({ message: "Unautharized" });
    }
  } catch (error) {
    next(error);
  }
};

// craete an admin
exports.adminUser = async (req, res, next) => {
  try {
    req.body.admin = req.user.id;
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (req.user.id === req.message.admin) {
      const user = await User.findByPk(userId);
      await req.message.removeUser(user);
      res.status(204).end();
    } else {
      res.status(401).json({ message: "Unautharized" });
    }
  } catch (error) {
    next(error);
  }
};
