const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user: String,
    flight: String
})

const BookingModel = mongoose.model("booking", bookingSchema)

module.exports = { BookingModel }