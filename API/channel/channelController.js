const { Channel, Message } = require("../../db/models");

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
        attributes: { exclude: ["createdAt", "updatedAt"] },
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

// update
exports.channelUpdate = async (req, res) => {
  const { channelId } = req.params;
  try {
    const foundchannel = await Channel.findByPk(channelId);
    if (foundchannel) {
      await foundchannel.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Channel not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete
exports.channelDelete = async (req, res) => {
  const { channelId } = req.params;
  try {
    const foundchannel = await Channel.findByPk(channelId);
    if (foundchannel) {
      await foundchannel.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Channel with this ID doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
