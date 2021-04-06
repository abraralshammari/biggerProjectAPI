//this library used to hash password
const bcrypt = require("bcrypt")
//Go to the models file
const {User} = require("../../db/models");
//jwt from jsonwebtoken
const jwt = require("jsonwebtoken");

const { JWT_SECRET , JWT_EXPIRATION_MS } = require("../../config/keys");

//SignUp Function
exports.signup = async (req,res,next) => {
    try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
        id: newUser.id,
        username: newUser.username,
        exp: Date.now() + JWT_EXPIRATION_MS,
        };
        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
        //sign method that takes 2 arg,the data we want to encrypt which is our payload -which HAS to be a string- and a secret code which is also a string.
        res.status(201).json({token});
    } catch (error) {
        next(error);
    }
};

//SignIn Function
exports.signin = (req, res, next) => {
    try { 
    const { user } = req;
    const payload = { //payload: an object that contain data will be send to frontend
        id: user.id,
        username: user.username,
        exp: Date.now() + parseInt(JWT_EXPIRATION_MS), // the token will expire 15min from when it's generated
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({token : token});
    } catch (error) {
        next(error);
    }
};