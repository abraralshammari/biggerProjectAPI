//express
const express = require("express");
//router
const router = express.Router();
//create route
const { channelCreate } = require("./channelController");


//create router
router.post("/createchannel" , channelCreate);


module.exports = router;