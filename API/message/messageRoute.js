const { Message } = require("../../db/models");


// // param middlewear
// router.param("messageId", async (req, res, next, messageId) => {
//     const channel = await fetchChannel(messageId, next);
//     if (channel) {
//       req.channel = channel;
//       next();
//     } else {
//       const err = new Error("Channel Not Found");
//       err.status = 404;
//       next(err);
//     }
//   });
