//requier localstrategy
const LocalStrategy = require("passport-local").Strategy;
//jwt from jsonwebtoken
const jwt = require("jsonwebtoken");
//requier bcrypt: we'll use method called compare that takes the two password and compares them
const bcrypt = require("bcrypt");
//JWT strategy
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

//We will pass our token in the request's authorization header with the scheme bearer
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

//import user model
const { User } = require("../db/models");

//JWT strategy instance that takes 2 arguments, an options object and a callback fun
exports.jwtStrategy = new JWTStrategy(
  {
    // to control how the token is extracted from the request or verified.
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); //this witt throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user); //if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);

//to find the username from back and and check if the user's pass to the saved pass to authinticate using(bcrypt-compaare)
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username }, // equivalent to { username : username }
    });

    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});
