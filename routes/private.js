const route = require('express').Router()

route.get('/', (req, res) => {
    if (req.user) {// user send the correct cookie
        return res.send("You are successfully Logged in")
    } else {
        res.redirect('/login')
    }
})

exports = module.exports = route