//express
const express = require("express");
//router
const router = express.Router();
//create route
const { addChannel } = require("./channelController");


//create router
router.post("/addchannel" , addChannel);


module.exports = router;