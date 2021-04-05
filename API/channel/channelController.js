const {Channel} = require("../../db/models/Channel");

exports.channelCreate = async (req, res) => {
    try {
      const newChannel = await Channel.create(req.body);
      res.status(201).json(newChannel);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };