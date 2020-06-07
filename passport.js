const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users


// to form the session
// used to serialize the user for the session
// determines which data of the user object should be stored in the session
//cookies
passport.serializeUser(function (user, done) {
    done(null, user.username)  // we store the username in the session
})
passport.deserializeUser(function (username, done) {  // to recover username from the session
    Users.findOne({
        username: username
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
})

// configuration
// how to authenticate the user
passport.use(new LocalStrategy(function (username, password, done) {
    Users.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        if (user.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

exports = module.exports = passport