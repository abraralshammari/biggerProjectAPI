//express
const express = require("express");
//router
const router = express.Router();
//signup & signin route
const { signup , signin } = require("./userController");
//passport
const passport = require("passport");

//{===============================================}//

//signup router
router.post("/signup", signup);

//signin router
router.post(
    "/signin", 
    passport.authenticate("local",{ session: false}),
    // local will tells passport to activate the localStrategy method
    signin
    );

module.exports = router;