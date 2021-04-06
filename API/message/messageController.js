const {Message, Channel} = require("../../db/models");

//Fetch Message
exports.fetchMessage = async (messageId, next) => {
    try {
      const message = await Message.findByPk(messageId);
      return message;
    } catch (error) {
      next(error);
    }
  };
  
  // Get the message list
  exports.getMessageList = async (req, res, next) => {
    try {
      const message = await Message.findAll({
        attributes: { exclude: ["channelId", "createdAt", "updatedAt"] },
        include: {
          model: Channel,
          as: "Channel",
          attributes: ["id"],
        },

      });
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  };