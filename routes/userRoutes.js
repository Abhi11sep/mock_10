const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const { UserModel } = require('../models/userModel')
const { FlightModel } = require('../models/flightModel')
const { BookingModel } = require('../models/bookingModel')
const jwt = require('jsonwebtoken')

userRouter.get("/", (req, res) => {
    res.send("WELCOME IN FLIGHT PORTAL")
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 2, async (err, hash) => {
            if (err) {
                console.log("unable to hash password", err)
            }
            const user = new UserModel({ name, email, password: hash })
            await user.save()
            console.log("resgistered")
            res.status(201).send()
        });

    } catch (error) {
        res.send("unable to register", error)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'masai');
                    console.log(`logged in,welcome : ${user[0].name},\n token : ${token}`)
                    res.send({ "msg": "logged in", "token": `${token}` })
                } else {
                    res.send("wrong credentials")
                }
            });
        } else {
            res.status(201).send("login first")
        }
    } catch (error) {
        res.send("error while login")
    }
})

userRouter.get("/flights", async (req, res) => {
    try {
        const flights = await FlightModel.find()
        res.status(200).send(flights)
    } catch (error) {
        res.send("unable to register", error)
    }
})

userRouter.get("/flights/:id", async (req, res) => {
    const ID = req.params.id
    console.log(ID)
    try {
        const flights = await FlightModel.find({ "_id": ID })
        res.status(200).send(flights)
    } catch (error) {
        res.send("unable to register", error)
    }
})

userRouter.post("/flights", async (req, res) => {
    const { airline, flightNo, departure, arrival, departureTime,
        arrivalTime, seats, price } = req.body;
    try {
        const flight = new FlightModel({
            airline, flightNo, departure, arrival, departureTime,
            arrivalTime, seats, price
        })
        await flight.save()
        console.log("Flight Added")
        res.status(201).send()
    } catch (error) {
        res.send("unable to register", error)
    }
})

userRouter.patch("/flights/:id", async (req, res) => {
    let payload = req.body;
    const ID = req.params.id
    console.log(ID)
    try {
        await FlightModel.findByIdAndUpdate({ "_id": ID }, payload)
        res.status(204).send("flights updated")
    } catch (error) {
        res.send("unable to update Flight Data", error)
    }
})

userRouter.delete("/flights/:id", async (req, res) => {
    const ID = req.params.id
    console.log(ID)
    try {
        await FlightModel.findByIdAndDelete({ "_id": ID })
        res.status(202).send("flights Deleted")
    } catch (error) {
        res.send("unable to delete Flight Data", error)
    }
})

userRouter.post("/booking", async (req, res) => {
    const payload = req.body
    console.log(payload)
    try {
        const book = await BookingModel(payload)
        await book.save();
        res.send("Flight Booked")
    } catch (error) {
        res.send("unable to Book Flight", error)
    }
})

userRouter.get("/dashboard", async (req, res) => {
    try {
        const flight = await BookingModel.find()
        res.status(200).send(flight)
    } catch (error) {
        res.send("unable to get dashboard", error)
    }
})

module.exports = { userRouter }
