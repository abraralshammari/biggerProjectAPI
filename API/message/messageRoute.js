//express
const express = require("express");
// const passport = require("passport");

//router
const router = express.Router();

//create route
const {
  addMessage,
  //   channelAdd,
  fetchMessage,
  getMessageList,
  messageDelete,
  messageUpdate,
} = require("./messageController");

// param middlewear
router.param("messageId", async (req, res, next, messageId) => {
  const message = await fetchMessage(messageId, next);
  if (message) {
    req.message = message;
    next();
  } else {
    const err = new Error("Message Not Found");
    err.status = 404;
    next(err);
  }
});

// Get Message List
router.get("/messages", getMessageList);

// Get Message
router.get("/message", fetchMessage);

//add router
router.post("/addmessage", addMessage);

//channel Route
// router.post(
//   "/message/:channelId/channel",
//   // passport.authenticate("jwt" , {session:false}),
//   channelAdd
// );

//  Message delete
router.delete("/message/:messageId", messageDelete);

//  Message update
router.put("/message/:messageId", messageUpdate);

module.exports = router;
