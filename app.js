const express = require("express");
const cors = require("cors");
const path = require("path");
//slugify
const slugify = require("slugify");
//db
const db = require("./db/models");
//Passport Strategies
const {localStrategy, jwtStrategy} = require("./middlewear/passport");
//import passport
const passport = require("passport");
//import user routes
const userRoutes = require("./API/user/userRoute");
//import channel route
const channelRoutes = require("./API/channel/channelRoute");



const app = express();
//{=====================================================================}


app.use(cors());
app.use(express.json());

//Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//user route
app.use(userRoutes);
//channel route
app.use(channelRoutes);

//// Handling errors middlewear
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  });

const run = async () => {
    try {
    //   await db.sequelize.sync({ alter: true });
      await db.sequelize.sync();
      console.log("Connection to the database was successful!");
      await app.listen(8000, () => {
        console.log("Server is runinng good");
      });
    } catch (error) {
      console.log("Error connecting to the db", error);
    }
  };
  run();
  