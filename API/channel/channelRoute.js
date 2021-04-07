//express
const express = require("express");
const passport = require("passport");

//router
const router = express.Router();

//create route
const {
  addChannel,
  addMessage,
  fetchChannel,
  getChannelList,
  channelDelete,
  channelUpdate,
  addUserToChannel,
  adminUser,
  deleteUser,
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

// Get Channel
router.get("/channel", fetchChannel);

//add router
router.post("/channel", addChannel);

//Message Route
router.post(
  "/channel/:channelId/message",
  // passport.authenticate("jwt" , {session:false}),
  addMessage
);

//UserChannel Route
router.post(
  "/channel/:channelId/user/:userId",
  passport.authenticate("jwt", { session: false }),
  addUserToChannel
);

//Admin Route
router.post(
  "/channel/admin",
  passport.authenticate("jwt", { session: false }),
  adminUser
);

//  Channel delete
router.delete("/channel/:channelId", channelDelete);

// delete user
router.delete(
  "/channel/:channelId/user/:userId",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

//  Channel update
router.put("/channel/:channelId", channelUpdate);

module.exports = router;
