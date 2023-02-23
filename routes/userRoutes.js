const express = require('express')
const userRouter = express.Router();
const { UserModel } = require('../models/userModel')

userRouter.get('/', (req, res) => {
    res.send('WELCOME IN USER SECTION')
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new UserModel({ name, email, password })
        await user.save();
        res.send('registered')
    } catch (error) {
        res.send('unable to register', error)
    }
})

module.exports = { userRouter }