const Strategy = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const User = mongoose.model("users");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = Extract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    else return done(null, user);
                })
                .catch(err => console.log(err));
        }));
};