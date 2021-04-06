const {Channel, Message} = require("../../db/models");
  
// get/fetch Channel
exports.fetchChannel = async (channelId, next) => {
    try {
      const channel = await Channel.findByPk(channelId);
      return channel;
    } catch (error) {
      next(error);
    }
  };
//Get Channel List
  exports.getChannelList = async (req, res, next) => {
    try {
      const channel = await Channel.findAll({
        attributes: ["id"],
        include: {
          model: Message,
          as: "messages",
          attributes: {exclude: ["createdAt", "updatedAt"]},
        },
      });
      res.status(200).json(channel);
    } catch (error) {
      next(error);
    }
  };

//add channel
  exports.addChannel = async (req, res, next) => {
      try {
          const newChannel = await Channel.create(req.body);
          res.status(201).json(newChannel);
      } catch (error) {
          next(error);
      }
  }

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
