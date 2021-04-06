//express
const express = require("express");
// const passport = require("passport");

//router
const router = express.Router();
//create route
const { 
    addChannel,
    addMessage,
    fetchChannel, 
    getChannelList
} = require("./channelController");

// param middlewear
router.param("channelId", async (req, res, next, channelId) => {
    const channel = await fetchChannel(channelId, next);
    if (channel) {
      req.channel = channel;
      next();
    } else {
      const err = new Error("Channel Not Found");
      err.status = 404;
      next(err);
    }
  });


// Get Channel List 
router.get("/channels", getChannelList);
//add router
router.post("/addchannel" , addChannel);
//Message Route
router.post("/channel/:channelId/message", 
// passport.authenticate("jwt" , {session:false}),
addMessage);


module.exports = router;