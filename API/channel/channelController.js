const {Channel} = require("../../db/models/Channel");


  //add channel
  exports.addChannel = async (req, res, next) => {
      try {
          const newChannel = await Channel.create(req.body);
          res.status(201).json(newChannel);
      } catch (error) {
          next(error);
      }
  }